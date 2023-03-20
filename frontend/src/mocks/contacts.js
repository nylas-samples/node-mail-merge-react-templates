function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomService() {
  const services = ['Registered Massage Therapy (RMT)', 'Fascial Stretch Therapy (FST)', 'Accupuncture', 'Chiropractor']
  return services[Math.floor(Math.random()*services.length)]
}

function randomPreferredAppointmentDay() {
  const preferrence = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return preferrence[Math.floor(Math.random()*preferrence.length)]
}

function randomServiceProvider() {
  const preferrence = ['Joe', 'Gary', 'Rex', 'Jennifer', 'Tiffany', 'Tim', 'Peter']
  return preferrence[Math.floor(Math.random()*preferrence.length)]
}

function randomGivenname() {
  const preferrence = ['Ram', 'Blag', 'Nick', 'Jamie', 'Aaron', 'Brent', 'Timothy']
  return preferrence[Math.floor(Math.random()*preferrence.length)]
}

function randomSurname() {
  const preferrence = ['Attia', 'Gerhart', 'Doe', 'Smith', 'Johnson', 'Miller', 'Davis']
  return preferrence[Math.floor(Math.random()*preferrence.length)]
}

const enrichContact = contact => ({
  ...contact,
  // Added random names for demo purposes
  given_name: randomGivenname(),
  surname: randomSurname(),
  last_visit_date: Math.floor(randomDate(new Date(2023, 0, 1), new Date()) / 1000),
  //converting to seconds as an input
  service_completed_recently: randomService(),
  preferred_appointment: randomPreferredAppointmentDay(),
  service_provider: randomServiceProvider(),
})

export default enrichContact;