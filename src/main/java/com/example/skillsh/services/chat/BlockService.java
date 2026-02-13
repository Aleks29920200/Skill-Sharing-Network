package com.example.skillsh.services.chat;

import com.example.skillsh.domain.entity.Block; // Assuming you have a Block entity
import com.example.skillsh.repository.BlockRepository; // Assuming a BlockRepository
import com.example.skillsh.repository.UserRepo; // Assuming a UserRepository
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for managing user blocking relationships.
 * This is a conceptual implementation. You would need to adapt it to your actual
 * `Block` entity and `BlockRepository` (or `UserRelation` as in my previous response).
 */
@Service
public class BlockService {

    private final BlockRepository blockRepository; // Assuming a repository for Block entities
    private final UserRepo userRepository; // To check if users exist

    public BlockService(BlockRepository blockRepository, UserRepo userRepository) {
        this.blockRepository = blockRepository;
        this.userRepository = userRepository;
    }

    /**
     * Blocks a target user by a source user.
     *
     * @param sourceUsername The username of the user initiating the block.
     * @param targetUsername The username of the user to be blocked.
     * @throws IllegalArgumentException if source or target user does not exist, or if blocking self.
     * @throws IllegalStateException if the user is already blocked.
     */
    @Transactional
    public void blockUser(String sourceUsername, String targetUsername) {
        if (sourceUsername.equals(targetUsername)) {
            throw new IllegalArgumentException("Cannot block yourself.");
        }

        // Verify both users exist
        userRepository.findUserByUsername(sourceUsername)
                .orElseThrow(() -> new IllegalArgumentException("Source user not found: " + sourceUsername));
        userRepository.findUserByUsername(targetUsername)
                .orElseThrow(() -> new IllegalArgumentException("Target user not found: " + targetUsername));

        // Check if block already exists
        if (blockRepository.findByBlockerUsernameAndBlockedUsername(sourceUsername, targetUsername).isPresent()) {
            throw new IllegalStateException("User " + targetUsername + " is already blocked by " + sourceUsername);
        }

        // Create and save the block entry
        // Assuming your Block entity has a constructor or setters for blockerUsername and blockedUsername
        Block block = new Block(); // Replace with your actual Block entity constructor/setters
        block.setBlockerUsername(sourceUsername);
        block.setBlockedUsername(targetUsername);
        blockRepository.save(block);
        System.out.println(sourceUsername + " successfully blocked " + targetUsername);
    }

    /**
     * Unblocks a target user by a source user.
     *
     * @param sourceUsername The username of the user initiating the unblock.
     * @param targetUsername The username of the user to be unblocked.
     * @throws IllegalArgumentException if source or target user does not exist.
     * @throws IllegalStateException if the user is not currently blocked.
     */
    @Transactional
    public void unblockUser(String sourceUsername, String targetUsername) {
        // Verify both users exist (optional, but good for data integrity)
        userRepository.findUserByUsername(sourceUsername)
                .orElseThrow(() -> new IllegalArgumentException("Source user not found: " + sourceUsername));
        userRepository.findUserByUsername(targetUsername)
                .orElseThrow(() -> new IllegalArgumentException("Target user not found: " + targetUsername));

        // Find the block entry
        Optional<Block> blockOptional = blockRepository.findByBlockerUsernameAndBlockedUsername(sourceUsername, targetUsername);

        if (blockOptional.isEmpty()) {
            throw new IllegalStateException("User " + targetUsername + " is not currently blocked by " + sourceUsername);
        }

        // Delete the block entry
        blockRepository.delete(blockOptional.get());
        System.out.println(sourceUsername + " successfully unblocked " + targetUsername);
    }

    /**
     * Checks if a source user has blocked a target user.
     *
     * @param sourceUsername The username of the potential blocker.
     * @param targetUsername The username of the potential blocked user.
     * @return true if sourceUsername has blocked targetUsername, false otherwise.
     */
    public boolean isBlocked(String sourceUsername, String targetUsername) {
        return blockRepository.findByBlockerUsernameAndBlockedUsername(sourceUsername, targetUsername).isPresent();
    }

    /**
     * Gets a list of usernames that the given user has blocked.
     *
     * @param username The user whose blocked list is requested.
     * @return A list of usernames that 'username' has blocked.
     */
    public List<String> getBlockedUsers(String username) {
        return blockRepository.findByBlockerUsername(username)
                .stream()
                .map(Block::getBlockedUsername) // Assuming Block has getBlockedUsername()
                .collect(Collectors.toList());
    }

    /**
     * Gets a list of usernames who have blocked the given user.
     *
     * @param username The user whose 'blocked by' list is requested.
     * @return A list of usernames who have blocked 'username'.
     */
    public List<String> getBlockedByUsers(String username) {
        return blockRepository.findByBlockedUsername(username)
                .stream()
                .map(Block::getBlockerUsername) // Assuming Block has getBlockerUsername()
                .collect(Collectors.toList());
    }
}
