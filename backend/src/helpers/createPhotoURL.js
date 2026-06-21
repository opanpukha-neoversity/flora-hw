import crypto from 'node:crypto';

export function createGravatarPhotoURL(value = 'flora bouquet') {
  const hash = crypto.createHash('md5').update(String(value).trim().toLowerCase()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=300`;
}

export function createUploadedPhotoURL(req, filename) {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  return `${protocol}://${req.get('host')}/photos/${filename}`;
}
