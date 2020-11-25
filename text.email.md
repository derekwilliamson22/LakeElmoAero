---------
Twilio account setup (text messages)
----------

- Visit https://www.twilio.com/ and create an account. This application currently uses the free trial tier.

- On your project dashboard click Get a Trial Number. This will generate a trial number that will be used as the sender number when texts are received.

- Choose a number and paste it into your application's .env file in the following format:

TWILIO_NUMBER=your_number
(remove the +1 at the beginning of your number)
Example: TWILIO_NUMBER=9993762342

- On your dashboard in Project Info you will see ACCOUNT SID and AUTH TOKEN copy those codes and paste them into your application's .env file in the following format:

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token

    Example:
        TWILIO_ACCOUNT_SID=AC7d9034kfbd93nfg9
        TWILIO_AUTH_TOKEN=i29v94jgjfl8937645hd783

- You will need to verify the recipient's phone numbers. On the Dashboard inProject info you can see a "verified numbers" hyperlink in blue text. Click on the hyper link. Click the red plus button to add a new number and insert the needed phone number. That phone number will receive a 

- Once your account is set up insert the three phone numbers you want alerts to be sent to in your application's .env file in the following format:

ADMIN_ONE=first_number
ADMIN_TWO=second_number
ADMIN_THREE=third_number

    Example: 
            ADMIN_ONE=7639267741
            ADMIN_TWO=6128880025
            ADMIN_THREE=6157993367



----------
SendGrid account setup (emails)
----------

- Visit https://sendgrid.com/ and create an account. This application currently uses the free tier which allows 100 emails per day. (each request sends 2 emails on appointment creation and 1 more upon completion)

- When you have finished filling out the forms click on "Create a Single Sender" and fill out the form that appears. Verify your sender address. Place the following in your application's .env file with your information.

    FROM_EMAIL_ADDRESS=email_to_respond_to

        Example: FROM_EMAIL_ADDRESS=testingemail@gmail.com

    ADMIN_EMAIL_ADDRESS=admin_email

        Example: ADMIN_EMAIL_ADDRESS=adminalert@gmail.com

- Navigate to "Settings" dropdown and select "API Keys" on the left side of the page. Click "Create API Key, Give it a name, allow full access, and click "Create & View". Copy the API key shown and paste it into your application's .env file in the following format.

    SENDGRID_API_KEY='YOUR_API_KEY_HERE'

        Ex: SENDGRID_API_KEY='SG.asd1234k239fdjshua5873'

(make sure to have the code in single quotes '')