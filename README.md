# #5 - Developers React To Monzo API (App)

![Behind the Buzzword](behind-the-buzzword-logo.jpeg)

A React Native App that uses the Monzo API

## Building

Run the following commands:

```bash
yarn install
yarn start
```

## Running on your device

After running the start script you will be able to open the Expo app on your device and scan the QR code.

## Challenges

### Part 1

1. Create an OAuth Client on the Monzo Developer Portal
1. Replace the mock authentication service with calls to the Monzo Authentication API

### Part 2

1. Build a new page for selecting a Monzo account
1. Build a new page for displaying all the transactions
1. Implement a feature to be able to mark a transaction as an expense

## Additional

You may not want to store the OAuth secret inside the app...so you can delegate exchanging the authorisation code to another web service.
If you are new to OAuth then you can use [this repository](https://github.com/behind-the-buzzword/5-developers-react-to-monzo-api-server) to deploy a server to Heroku, and that will handle the exchange.
