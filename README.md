# OpenMusic API Version 3

[Database Diagram](https://dbdiagram.io/d/63a2bfa999cb1f3b55a2b29e)

## Kriteria OpenMusic API version 3
TODO:
- [ ] Ekspor Lagu Pada Playlist
  - [ ] Menggunakan message broker dengan menggunakan RabbitMQ.
    - Nilai host server RabbitMQ wajib menggunakan environment variable RABBITMQ_SERVER
  - [ ] Hanya pemilik Playlist yang boleh mengekspor lagu.
  - [ ] Wajib mengirimkan program consumer.
  - [ ] Hasil ekspor berupa data json.
  - [ ] Dikirimkan melalui email menggunakan nodemailer.
    - Kredensial alamat dan password email pengirim wajib menggunakan environment variable MAIL_ADDRESS dan MAIL_PASSWORD.
    - Serta, nilai host dan port dari server SMTP juga wajib menggunakan environment variable MAIL_HOST dan MAIL_PORT.
  - [ ] Response yang harus dikembalikan:
    - Status Code: 201
    - Response Body:
      ```json
      {
        "status": "success",
        "message": "Permintaan Anda sedang kami proses"
      }
        ```
  - [ ] Struktur data JSON yang diekspor adalah seperti ini:
    ```json
    {
      "playlist": {
        "id": "playlist-Mk8AnmCp210PwT6B",
        "name": "My Favorite Coldplay Song",
        "songs": [
          {
            "id": "song-Qbax5Oy7L8WKf74l",
            "title": "Life in Technicolor",
            "performer": "Coldplay"
          },
          {
            "id": "song-poax5Oy7L8WKllqw",
            "title": "Centimeteries of London",
            "performer": "Coldplay"
          },
          {
            "id": "song-Qalokam7L8WKf74l",
            "title": "Lost!",
            "performer": "Coldplay"
          }
        ]
      }
    }
    ```
- [ ] Mengunggah Sampul Album.
    - Body Request (Form data).
      ```json
      {
        "cover": file
      }
      ```
    - Tipe konten yang diunggah harus merupakan MIME types dari images.
    - Ukuran file cover maksimal 512000 Bytes.
    - Anda bisa menggunakan File System (lokal) atau S3 Bucket dalam menampung object.
      - Bila menggunakan S3 Bucket, nama bucket wajib menggunakan variable environment AWS_BUCKET_NAME.
    - Response yang harus dikembalikan:
    - Status Code: 201
    - Response Body:
      ```json
      {
        "status": "success",
        "message": "Sampul berhasil diunggah"
      }
      ```
- [ ] Menyukai Album
- [ ] Menerapkan Server-Side Cache  