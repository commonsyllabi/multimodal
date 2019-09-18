let init = () => {
  console.log('hey');
  document.getElementsByClassName('nav-left')[0].click = () => {
    window.history.back()
  }

  document.getElementsByClassName('nav-right')[0].click = () => {
    window.history.forward()
  }
}
