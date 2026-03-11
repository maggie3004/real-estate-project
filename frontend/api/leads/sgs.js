/**
 * TeleCRM Lead Proxy (Serverless Function)
 * Path: /api/leads/sgs
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;
  const { name, phone, email, config, form_type, lead_source, project_name, page_url, device, referrer, utm_source, utm_medium, utm_campaign } = formData;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  // 1. Format Phone Number (+91XXXXXXXXXX)
  let formattedPhone = phone.replace(/\D/g, ''); // Remove non-digits
  if (formattedPhone.length === 10) {
    formattedPhone = `+91${formattedPhone}`;
  } else if (formattedPhone.length === 12 && formattedPhone.startsWith('91')) {
    formattedPhone = `+${formattedPhone}`;
  } else if (!formattedPhone.startsWith('+')) {
    formattedPhone = `+${formattedPhone}`;
  }

  // 2. Combine fields into the 'note' field for TeleCRM
  const noteParts = [
    `Project: ${project_name || 'Shree Ganesh Srushti'}`,
    config ? `Config: ${config}` : '',
    form_type ? `Form: ${form_type}` : '',
    device ? `Device: ${device}` : '',
    page_url ? `Page: ${page_url.split('/').pop() || 'shree-ganesh-srushti'}` : '',
    referrer ? `Referrer: ${referrer}` : '',
    utm_source ? `Source: ${utm_source}` : '',
    utm_medium ? `Medium: ${utm_medium}` : '',
    utm_campaign ? `Campaign: ${utm_campaign}` : ''
  ].filter(Boolean).join(' | ');

  // 3. TeleCRM Payload Format (v2)
  const teleCrmPayload = {
    fields: {
      name: name,
      phone: formattedPhone,
      email: email || '',
      note: noteParts,
      source: lead_source || "QR Landing Page"
    }
  };

  // RESTORING HARDCODED FALLBACKS AS REQUESTED
  const token = process.env.TELECRM_API_TOKEN || '8f18fb2f-2bee-4e5f-9b41-33ace180ef181773242420270:e11ea304-5650-4d87-b323-dcd3cd87c075';
  const apiUrl = process.env.TELECRM_API_URL || 'https://next.telecrm.in/autoupdate/v2/enterprise/69a15241a734245ce0c34522/lead';

  try {
    console.log('[TeleCRM v2 Proxy] Forwarding:', JSON.stringify(teleCrmPayload, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(teleCrmPayload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('[TeleCRM Proxy] Error Response:', data || response.statusText);
      return res.status(response.status).json({ 
        error: 'TeleCRM API error', 
        details: data || { message: response.statusText } 
      });
    }

    console.log('[TeleCRM Proxy] Success:', data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('[TeleCRM Proxy] Exception:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
