import axios from 'axios'
const qs = require('querystring')
const btoa = require('btoa')
import { parseCookies, setCookie, destroyCookie } from 'nookies'
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
export default async function handler(req, res) {
    const {
        query: { code },
      } = req
     const accountCreds = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
    grant_type:'authorization_code', code, redirect_uri: 'http://localhost:3000/api/spotify/callback'
        
        
    }), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": 'Basic ' + btoa(`${client_id}:${client_secret}`)
      }}).then(e=>e.data)
    console.log(accountCreds)

    setCookie({ res }, 'spotify', accountCreds.access_token, {
        maxAge: accountCreds.expires_in,
        path: '/',
      })

    res.redirect('http://localhost:3000/')

  }

 