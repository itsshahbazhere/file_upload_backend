# File Upload Backend

This project is a backend service for uploading files (images and videos). After a file is uploaded, it is processed to reduce image size (if applicable) and then an email is sent to the user confirming successful upload.

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB (Mongoose)** - Database
- **Cloudinary** - File storage
- **Nodemailer** - Email service
- **dotenv** - Environment variable management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/itsshahbazhere/file_upload_backend.git
   cd file_upload_backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys and update with your values:
     ```env
     CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
     MONGO_URL=<your-mongodb-connection-string>
     PORT=4000
     EMAIL_HOST=smtp.gmail.com
     EMAIL_USER=<your-email>
     EMAIL_PASS=<your-email-password>
     ```

## Usage

1. Use Nodemon for automatic restarts:
   ```sh
   npm run dev
   ```

## API Endpoints

### `POST /api/v1/upload/localFileUpload`
Uploads a file locally.

#### Request Body
```json
{
  "imageFile": "<image-file>"
}
```

### `POST /api/v1/upload/videoUpload`
Uploads a video to Cloudinary.

#### Request Body
```json
{
  "videoFile": "<video-file>",
  "name": "<uploader-name>",
  "email": "<uploader-email>",
  "tag": "<file-tag>"
}
```

### `POST /api/v1/upload/imageUpload`
Uploads an image to Cloudinary.

### `POST /api/v1/upload/imageReducerUpload`
Uploads an image and reduces its size.

#### Request Body (for image uplaods)
```json
{
  "imageFile": "<image-file>",
  "name": "<uploader-name>",
  "email": "<uploader-email>",
  "tag": "<file-tag>"
}
```

## Author
**Shahbaz**  
[GitHub Profile](https://github.com/itsshahbazhere)
