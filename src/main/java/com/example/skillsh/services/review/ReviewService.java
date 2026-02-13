package com.example.skillsh.services.review;

import com.example.skillsh.domain.entity.Review;
import com.example.skillsh.domain.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ReviewService{
    Optional<Review> findById(Long aLong);
    List<Review> findReviewByReviewedUser(User user);
    void addReview(String reviewerUsername, Long revieweeId, String content);
}
