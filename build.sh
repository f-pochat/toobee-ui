set -ex
npm install
npm run build

aws s3 sync dist s3://toobee-ui
aws cloudfront create-invalidation --distribution-id E2UOYVFI49H86X --paths "/*"