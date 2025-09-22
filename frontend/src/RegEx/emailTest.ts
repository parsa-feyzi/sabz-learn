function emailTest(email: string) {
  const emailValidat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]{2,3}$/g
  return emailValidat.test(email)
}

export default emailTest