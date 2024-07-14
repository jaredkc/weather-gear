# Weather Gear

Know how to gear up when cycling or running based on the weather.

## Open Weather Map API

Used to get the weather data for the app. The API key is stored in the `.env` file. Types, utility functions, and sample data are located in the `app/openweathermap` directory.

Relevant docs:

- [One Call API 3.0](https://openweathermap.org/api/one-call-3)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)
  - By query: `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
  - Zip: `http://api.openweathermap.org/geo/1.0/zip?zip={zip}&limit={limit}&appid={API key}`
  - By Lat/Lon: `http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}`
- [Icons](https://openweathermap.org/weather-conditions)
- API Version 2.5. Currently not used. Converted to one-call-3 for the desired data needed.
  - [Call 5 day / 3 hour forecast data](https://openweathermap.org/forecast5#5days)
    - City query: `https://api.openweathermap.org/data/2.5/forecast?q={city name}&cnt=3&appid={API key}`
    - Zip code: `https://api.openweathermap.org/data/2.5/forecast?zip={zip code}&cnt=3&appid={API key}`
    - Lat/Lon: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&cnt=3&appid={API key}`
  - [Weather API Request by City Name](https://openweathermap.org/current#name)
    - City query: `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
  - API Request by Latitude and Longitude
    - `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

## Remix Grunge Stack

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template remix-run/grunge-stack
```

## What's in the stack

- [AWS deployment](https://aws.com) with [Architect](https://arc.codes/)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Styling with [Tailwind](https://tailwindcss.com/)
- Local third party request mocking with [MSW](https://mswjs.io)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Upgrade Remix

A CLI utility to update/list all of your Remix dependencies together.

```sh
npx upgrade-remix
```

## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments. By default, Arc will deploy to the `us-west-2` region, if you wish to deploy to a different region, you'll need to change your [`app.arc`](https://arc.codes/docs/en/reference/project-manifest/aws)

Prior to your first deployment, you'll need to do a few things:

- Create a new [GitHub repo](https://repo.new)

- [Sign up](https://portal.aws.amazon.com/billing/signup#/start) and login to your AWS account

- Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to [your GitHub repo's secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Go to your AWS [security credentials](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials) and click on the "Access keys" tab, and then click "Create New Access Key", then you can copy those and add them to your repo's secrets.

- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions).

- Create an [AWS credentials file](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html#getting-started-quickstart-new).

- Along with your AWS credentials, you'll also need to give your CloudFormation a `SESSION_SECRET` variable of its own for both staging and production environments, as well as an `ARC_APP_SECRET` for Arc itself.

  ```sh
  npx arc env --add --env staging ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env staging SESSION_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production SESSION_SECRET $(openssl rand -hex 32)
  ```

  If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

## Where do I find my CloudFormation?

You can find the CloudFormation template that Architect generated for you in the sam.yaml file.

To find it on AWS, you can search for [CloudFormation](https://console.aws.amazon.com/cloudformation/home) (make sure you're looking at the correct region!) and find the name of your stack (the name is a PascalCased version of what you have in `app.arc`, so by default it's WeatherGearAd92Staging and WeatherGearAd92Production) that matches what's in `app.arc`, you can find all of your app's resources under the "Resources" tab.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.
