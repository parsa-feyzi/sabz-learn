function telTest(tel: string) {
  const telValidat = /^[0][9][0-9]{9}$/g
  return telValidat.test(tel)
}

export default telTest