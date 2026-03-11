export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, config, message, form_type } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  // Use environment variables from Vercel dashboard
  const token = process.env.TELECRM_API_TOKEN || '8f18fb2f-2bee-4e5f-9b41-33ace180ef181773242420270:e11ea304-5650-4d87-b323-dcd3cd87c075';
  const apiUrl = process.env.TELECRM_API_URL || 'https://next.telecrm.in/autoupdate/v2/enterprise/69a15241a734245ce0c34522/lead';

  // 1. Format Phone Number (+91XXXXXXXXXX)
  let formattedPhone = phone.replace(/\D/g, ''); // Remove non-digits
  if (formattedPhone.length === 10) {
    formattedPhone = `+91${formattedPhone}`;
  } else if (formattedPhone.length === 12 && formattedPhone.startsWith('91')) {
    formattedPhone = `+${formattedPhone}`;
  } else if (!formattedPhone.startsWith('+')) {
     // If it's already got more digits, just prepend + if missing
     formattedPhone = `+${formattedPhone}`;
  }

  // 2. Combine config and message into note
  const noteParts = [
    `Project: Shree Ganesh Srushti`,
    `Config: ${config || 'Not specified'}`,
    `Form: ${form_type || 'General'}`,
    message ? `Msg: ${message}` : ''
  ].filter(Boolean).join(' | ');

  // 3. Construct Payload
  const leadData = {
    fields: {
      name: name,
      phone: formattedPhone,
      email: email || '',
      note: noteParts,
      source: "Ganesh Srushti QR Campaign"
    }
  };

  try {
    console.log('Forwarding to TeleCRM v2:', JSON.stringify(leadData, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(leadData)
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
        console.error('TeleCRM Error Response:', data);
        return res.status(response.status).json({ 
          error: 'TeleCRM API error', 
          details: typeof data === 'object' ? data : { message: data } 
        });
    }

    console.log('TeleCRM Success:', data);
    return res.status(200).json({ success: true, message: 'Lead captured successfully.' });
  } catch (error) {
    console.error('Serverless Function Exception:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
