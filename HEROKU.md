# Heroku!

**Install Heroku / Sign Up**

1. Run these two commands in your terminal

```
brew tap heroku/brew
brew install heroku
```

2. Sign up for a free account on [heroku.com](https://www.heroku.com)

3. Login to Heroku in your terminal:

```
heroku login
```

**Setup your projects to use Heroku**

From your project directory, create the heroku server

```
heroku create
```

Then create a postgres database

```
heroku addons:create heroku-postgresql:hobby-dev
heroku pg:push <your local database name> DATABASE_URL
```

Make sure to replace `<your local database name>` with the actual name of your database.

**Deploy your app to heroku**

Commit as normal, then push to heroku:

```
git add .
git commit -m 'my awesome stuff'
git push heroku master
```

Or, deploy automatically from Github:

1. In [your list of Heroku apps](https://dashboard.heroku.com/apps), select your application.
2. Under the `Deploy` tab, in the `Deployment Method` section, select `Github`. Connect to the `Github` repository with your application by searching for the name of your repository.
3. In the `Manual Deploy` section, click `Deploy Branch` to deploy for the first time.

**Helpers**

View app logs

```
heroku logs -t
```

Open your app

```
heroku open
```

**Connect to Postico**

If you would like to edit your database, you can connect to your Heroku database directly from Postico. 

1. In [your list of Heroku apps](https://dashboard.heroku.com/apps), select your application.
2. Under `Resources` or in the `Configure Add-Ons` section, select `Heroku Postgres`.
3. Select the `Settings` tab and click `View Credentials`
4. Open Postico and select `New Favorite`.
5. In the new Postico favorite, update the following to match Heroku:
  - Host
  - User
  - Database
  - Password
  - Port
6. Click `Connect` and you should have access to your database directly from Postico!

Good luck!