# Api Gateway demo app

`nginx` has to be configured:

```bash
http {
  server {
    listen [::]:443;
    location /apiGateway/ {
        proxy_pass http://localhost:3001/apiGateway;
    }
  }
}
```
