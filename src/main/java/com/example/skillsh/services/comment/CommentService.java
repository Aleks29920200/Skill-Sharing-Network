package com.example.skillsh.services.comment;

import com.example.skillsh.domain.entity.Comment;
import com.example.skillsh.domain.entity.Review;
import com.example.skillsh.domain.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService{
void addComment(User user, String something, Review review);
List<Comment> findCommentByReview(Review review);
}
