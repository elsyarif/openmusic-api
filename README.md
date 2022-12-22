# OpenMusic API versi 2

[Database Diagram](https://dbdiagram.io/d/63a2bfa999cb1f3b55a2b29e)

## Kriteria OpenMusic API versi 2
TODO:  
- [x] Membuat Users
    - [x] Membuat Migrasi Users
    - [x] Membuat UserService
    - [x] Membuat Validator User
    - [x] Membuat API User Plugin
- [ ] Membuat Authentictions
    - [x] Membuat Migrasi Authentictions
    - [x] Membuat AuthenticationService
        - [x] Memasukkan refresh token (addRefreshToken).
        - [x] Memverifikasi atau memastikan refresh token ada di database (verifyRefreshToken).
        - [x] Menghapus refresh token (deleteRefreshToken).
    - [x] Membuat Validator Authentictions
    - [x] Membuat Token Menager
        - [x] Membuat atau men-generate access token (generateAccessToken).
        - [x] Membuat atau men-generate refresh token (generateRefreshToken).
        - [x] Memverifikasi refresh token (verifyRefreshToken).
    - [x] Membuat API Authentictions Plugin
- [ ] Membuat Playlilsts
    - [ ] Membuat Migrasi Playlilsts
    - [ ] Membuat PlaylistService
    - [ ] Membuat Validator Playlists
    - [ ] Membuat API Playlilsts Plugin
- [ ] Membuat Playlist Songs
    - [ ] Membuat Migrasi Playlist Songs
    - [ ] Membuat PlaylistSongService
    - [ ] Membuat Validator Playlist Song
    - [ ] Membuat API Playlist Song Plugin
- [ ] Membuat Collaborations
    - [ ] Membuat Migrasi Collaborations
    - [ ] Membuat CollaborationService
    - [ ] Membuat Validator Collaborations
    - [ ] Membuat API Collaborations Plugin
- [ ] Membuat Playlist Song Activities
    - [ ] Membuat Migrasi Playlist Song Activities
    - [ ] Membuat PlaylistSongActivitieService
    - [ ] Membuat Validator Playlist Song Activities
    - [ ] Membuat API Playlist Song Activities Plugin
- [ ] Penanganan Error Handling
    - [x] Authentictions Error 401 (Unauthorized)
    - [ ] Authorization Error 403 (Forbidden)

- [ ] Registrasi dan Autentikasi Pengguna
    - [ ] /users
        - Method: POST
        - Body Request:
            ```json
            {
                "fullname" : "string",
                "username" : "string",
                "password" : "string"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "userId": "user_id"
                }
            }
            ```
    - [ ] /authentictions
        - Method: POST
        - Body Request:
            ```json
            {
                "username" : "string",
                "password" : "string"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token",
                    "refreshToken": "token"
                }
            }
            ```
    - [ ] /authentictions
        - Method: PUT
        - Body Request:
            ```json
            {
                "refreshToken" : "token"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token"
                }
            }
            ```
    - [ ] /authentictions
        - Method: DELETE
        - Body Request:
            ```json
            {
                "refreshToken" : "token"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token"
                }
            }
            ```