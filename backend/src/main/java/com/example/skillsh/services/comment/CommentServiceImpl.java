package com.example.skillsh.services.comment;

import com.example.skillsh.domain.entity.Comment;
import com.example.skillsh.domain.entity.Review;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepo commentRepo;
@Autowired
    public CommentServiceImpl(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    @Override
    public void addComment(User user, String something, Review review) {
        Comment comment = new Comment();
        comment.setAuthor(user);
        comment.setText(something);
        comment.setDate(LocalDate.now());
        comment.setReview(review);

        commentRepo.save(comment);
    }

    @Override
    public List<Comment> findCommentByReview(Review review) {
        return this.commentRepo.findCommentByReview(review);
    }
}
