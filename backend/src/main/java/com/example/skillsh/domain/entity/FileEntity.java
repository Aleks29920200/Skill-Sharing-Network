package com.example.skillsh.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fileName;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = Integer.MAX_VALUE)
    private byte[] fileData;

    private String contentType;

    public String getContentType() {
        return contentType;
    }

    public FileEntity setContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }
}
