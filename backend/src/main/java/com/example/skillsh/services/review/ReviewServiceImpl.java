package com.example.skillsh.services.review;

import com.example.skillsh.domain.entity.Review;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.repository.ReviewRepo;
import com.example.skillsh.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepo repo;
    private UserRepo userRepo;
@Autowired
    public ReviewServiceImpl(ReviewRepo repo, UserRepo userRepo) {
        this.repo = repo;
    this.userRepo = userRepo;
}

    @Override
    public Optional<Review> findById(Long aLong) {
        return this.repo.findById(aLong);
    }

    @Override
    public List<Review> findReviewByReviewedUser(User user) {
        return this.repo.findReviewByReviewedUser(user);
    }

    @Override
   public void addReview(String reviewerUsername, Long revieweeId, String content) {
        if (revieweeId == null || reviewerUsername == null) return;

        User reviewer = userRepo.findUserByUsername(reviewerUsername)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));
        User reviewee = userRepo.findById(revieweeId)
                .orElseThrow(() -> new RuntimeException("Reviewee not found"));

        if (reviewer.getId().equals(revieweeId)) {
            throw new IllegalArgumentException("Users cannot review themselves.");
        }

        Review review = new Review();
        review.setReviewingUser(reviewer);
        review.setReviewedUser(reviewee);
        review.setReviewText(content);
        review.setDateOfReview(LocalDate.now());

        repo.save(review);
    }
}
