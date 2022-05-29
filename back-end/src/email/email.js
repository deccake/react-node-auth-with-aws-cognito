import nodemailer from 'nodemailer'
import {google} from 'googleapis'

export const VerficationMail = ({to,subject,html}) => {
    const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2({
    clientId:'794773632289-81mo09710nccseo74lui6op0o0k33nn3.apps.googleusercontent.com',
    clientSecret:'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',
    redirectUri:'https://developers.google.com/oauthplayground'
})

oauth2Client.setCredentials({
    refresh_token:'1//04TS9_b6k0HFoCgYIARAAGAQSNwF-L9IrxrA7BeiLBGjN89MXfdd4IrgT2z7BZnysx-Eu0H41H7CoifXWXjCW0pc0mAXGGMbmGvk'
})

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:'amolw211@gmail.com',
        clientId:'794773632289-81mo09710nccseo74lui6op0o0k33nn3.apps.googleusercontent.com',
        clientSecret:'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',
        refreshToken:'1//04TS9_b6k0HFoCgYIARAAGAQSNwF-L9IrxrA7BeiLBGjN89MXfdd4IrgT2z7BZnysx-Eu0H41H7CoifXWXjCW0pc0mAXGGMbmGvk',
        accessToken
    },
    tls:{
        rejectUnauthorized:false
    }
})

const mailOptions = {
    from: "amolw211@gmail.com",
    to,
    subject,
    generateTextFromHTML: true,
    html
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});


}

