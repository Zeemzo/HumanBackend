import * as admin from 'firebase-admin';

import * as dotenv from "dotenv";
dotenv.config();
const serviceAccount:any ={
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id":process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri":process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  }

// const serviceAccount:any ={
//   "type": "service_account",
//   "project_id": "human-24b1b",
//   "private_key_id": "e4169091f75d30ea661b058b714ee4c422bac8cd",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRPT3Qv3SGy45/\niPdcnt5kbUsFdg6X4G580Yqe0s9c9x72gCucTKPuEEAKPGpuPnxBVdz5mpsZ6JeO\n2iDHvA7fCzSIcuS5pUkMmlfy5DbLBeXooPJcdcARwFYP/3Br3rRwIJQkWm2bHS7j\n8XkDcRGGjt/PaEKF+6UaleLO4qw+j7grz4WK1eKNdabHuGf3RlXjutslxwuS0Snu\nPfgTA7nw03fEQPJ4WzQOH8Ehu6KMTpbfAn7N8s/mUS3B/jHpg+EtxFd83ESElOk0\nXEhXttj6Ovv4if1Q/IMXhyOC3dhS059GSVhTJ+udNliS9rOGnfENGeMsMOmUdSB9\nRb9I6sAvAgMBAAECggEAQq0VSbP42gt7uUBYMvedPrtlMLRSKiumibfsSHg9BA7r\nmvl07DWv92jOP3TJJaBb0CYgaJnP2w23Xho8X+mZg5H6h5C1OkNlZ9K3O/tlSoTy\nopLHKJeNQRrdUfPAS1+IeEKpcnwueUNvccu9GE+rmgllYJ6EtFVgY3xn7i1lXfmy\nw+4jyWEV7cS/z0A793G5Hc3UGiacHF3xWItRt3BhwQ2ueqWuBwzQVJjrXTgpyVND\nWizJv3S+ygWl++M2ktRwJp3NVfvvq9uTnejeiAj8TfO9jqQw+UxfjP6zavWnoHJ7\nC4ELSjfverrxHrH0NQ9Zj3/59Qf83vv1RRzq7fO6oQKBgQDwyAj0cpQzh1BO3Twp\ntRiWplW7AWhLvaoyUqJ0InG78YwtyPo45jXlqR55EW/d3cNN5KHwPKLjt3r/v+7F\nwbHx4O+ezs2g+dT2Uz6tWFSwfiP24zGFEshFMXNLSMeCxYDCLyPXFEQQliXxz1OI\n+y1OKsUbRwkks0zS+83htU/qhQKBgQDedtaanO2y9e6nDgiVo4l6/fWmlxLRpOD5\n+t62KhvoHGktJXFG7GFUdRKKn7j59lCuwJ1oUa+n8ckWgKXsQMozONnFuamP4ePl\nbRkjWLoeZaHi+fbAjEv2lp3qcl0bFEj3GjwGkyNIfCxzMs5UFmd76suFMsAXK0jo\nCzkzfu3wIwKBgQCIT9ax/QPlwB845oqe2gVXlEdInV1cM73cy2do8+8LhY3khbkS\n6VFt+TZlN/fq1RcyS9NZ3BojbMZXb2NP1X5V/w/pCg7jqUxlP29mV3FqkZ7usGRi\nf+WdNoedAVDhucpRJLrXkoOOGFLW+JbEH97gN9pqvOZyPoepkiBWPX1GuQKBgQDO\nw8VSjuienNXjjreL3SO6nK/k1iU3lPdFYFX/GcQ2R7G5tENEmA8eYHGLRki2iqkS\nwxOKEeIhRiiQMaIFo3JLiVte2uEuSdV3N59VqvHRrsR4Ibul2r//wJ2legXvVTs7\n77Y6pib1B/SIXYBHx0sHcYMXmcPPxPtOMKBJrH+Z4QKBgFB13E3Vhd24JRvrJ9bU\nC62ErR9fSVRlMMRtP4m2aNDRit0elW3rB34HJSivjGBlN7aPrPLTuxL456B5bw4T\ntQ5If9Lw2ela9VFglmUzco9diWUB8xZ3fL8j++Fqq8I652Rbtw8vQxivEUEC0ztZ\ndOCiaxM3U7HUoS4gLnew+aDz\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-lvml6@human-24b1b.iam.gserviceaccount.com",
//   "client_id": "101797436797496203876",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lvml6%40human-24b1b.iam.gserviceaccount.com"
// }


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://human-24b1b.firebaseio.com"
  });

  export{admin};