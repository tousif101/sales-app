import nextConnect from 'next-connect';
import formidable from 'formidable';

const handler = nextConnect();

export const config = {
    api: {
      bodyParser: false,
    },
  };

  handler.use(async (req, res, next) => {
    if (req.method !== 'POST') {
      return next();
    }
  
    const form = new formidable.IncomingForm();
    form.uploadDir = 'public/files';
    form.keepExtensions = true;
  
    // Add progress event logging
    form.on('progress', (bytesReceived, bytesExpected) => {
      console.log(`Received: ${bytesReceived} / Expected: ${bytesExpected}`);
    });
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ detail: 'Error parsing form.' });
        return;
      }
  
      req.fields = fields;
      req.files = files;
      next();
    });
  });

handler.post((req, res) => {
  if (!req.files || !req.files.video) {
    res.status(400).json({ detail: 'No video file provided.' });
    return;
  }

  console.log('File uploaded:', req.files.video);
  res.status(200).json({ detail: 'File uploaded successfully.' });
});

export default handler;