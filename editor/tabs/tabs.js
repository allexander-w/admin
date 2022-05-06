export class Tabs {
  static get toolbox() {
    return {
      title: 'Tabs',
      icon: '<i class="far fa-tags"></i>'
    };
  }

  constructor({data}){
    this.data = data;
  }

  getTabHTML( payload ) {
    if ( payload ) {
      return `
        <div class="tab-wrapper">
          <div class="heading flex ai-center">
            <input type="text" value="${ payload.name }" placeholder="Название таба">
            <div class="remove"> <i class="far fa-trash" id="to_trash"></i></div>
          </div>
          <div contenteditable>${payload.content}</div>
        </div>
      `
    }

    return `
      <div class="tab-wrapper">
        <div class="heading flex ai-center">
          <input type="text" placeholder="Название таба">
          <div class="remove"> <i class="far fa-trash" id="to_trash"></i></div>
        </div>
        <div contenteditable></div>
      </div>
    `
  }

  getButtonHTML() {
    return `
      <button class="tab-button" id="button_adder">
        Добавить таб
      </button>
    `
  }

  render(){
    console.log( this.data )



    const wrapper = document.createElement('div')
    wrapper.insertAdjacentHTML('beforeend', this.getButtonHTML())

    if ( this.data && Array.isArray(this.data.data) && this.data.data.length ) {
      this.data.data.forEach( el => {
        wrapper.insertAdjacentHTML('beforeend', this.getTabHTML( el ))
      })
    }

    document.addEventListener("click", e => {
      if ( e.target.id === "button_adder" ) {
        wrapper.insertAdjacentHTML('beforeend', this.getTabHTML())
      }

      if ( e.target.id === "to_trash" ) {
        e.target.parentElement.parentElement.parentElement.remove()
      }
    })

    return wrapper;
  }

  save(blockContent){
    const wrapper = document.querySelectorAll(".tab-wrapper")
    let output = []

    wrapper.forEach($element => {
      output.push({ name: $element.children[0].children[0].value, content: $element.children[1].innerHTML })
    })

    return { data: output }
  }
}
