export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
  const formsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdKYszFyZrY3M2b9w9Vgit2KS44u3Dli9I7r81PXASGT65U9g/formResponse?&submit=Submit?usp=pp_url&entry.1564785546=*PURPOSE*&entry.82466501=*NAME*&entry.1299586216=*EMAIL*&entry.945781104=*ORG*&entry.714111775=Yes&entry.2138348062=*URL*"
  function createFormsUrl() {
    let formSubmissionUrl = formsUrl.replace('*NAME*', req.query.name);
    formSubmissionUrl = formSubmissionUrl.replace('*EMAIL*', req.query.email);
    formSubmissionUrl = formSubmissionUrl.replace('*ORG*', req.query.org);
    formSubmissionUrl = formSubmissionUrl.replace('*PURPOSE*', req.query.purpose);
    return formSubmissionUrl.replace('*URL*', req.query.query);
  }
  fetch(createFormsUrl(), {
    method: 'POST', 
    mode: 'cors',
    body: ''
  });
  res.status(200).json({'form submission':'Complete'})
}