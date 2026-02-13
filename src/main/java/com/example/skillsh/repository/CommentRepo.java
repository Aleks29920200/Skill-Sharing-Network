package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.Comment;
import com.example.skillsh.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
List<Comment> findCommentByReview(Review review);

}
