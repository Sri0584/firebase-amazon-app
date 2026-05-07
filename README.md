Deployed to http://ec2-18-188-41-9.us-east-2.compute.amazonaws.com/
Deployment steps to Amazon EC2
create an amazon Ec2 instance
selecting an Ubuntu OS, create a key value pair and launch the instance
we try to connect the instance and in the virtual terminal created by ubuntu, we install node,npm and nginx
clone our git repo
npm install
npm run build
sudo cp -r dist/* /var/www/html
to write env variables create a file
nano .env.production
copy paste all the env keys needed
ctrl+o,enter,ctrl+x to save the file
npm run build
And redeploy/restart your server, for example with Nginx:

sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
