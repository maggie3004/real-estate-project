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
  const apiUrl = process.env.TELECRM_API_URL || 'https://api.telecrm.in/v1/leads';

  const leadData = {
    fields: {
      name: name,
      phone: phone,
      email: email || '',
      note: `Configuration: ${config || 'Not specified'}. ${message ? 'Message: ' + message : ''} (Form: ${form_type || 'General'})`,
      source: "Ganesh Srushti QR Campaign",
      project_name: "Shree Ganesh Srushti",
      city: "Nashik"
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(leadData)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('TeleCRM Error:', data);
        return res.status(response.status).json({ error: 'TeleCRM API error', details: data });
    }

    console.log('TeleCRM Success:', data);
    return res.status(200).json({ success: true, message: 'Lead captured successfully.' });
  } catch (error) {
    console.error('Serverless Function Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
