# Contact API

## Dev
1) copier `.env.sample` -> `.env`
2) `npm i`
3) `node server.js`

## Production
- lancé derrière Nginx en reverse proxy sur `/api/`
- systemd : `sudo systemctl restart contact-api`
