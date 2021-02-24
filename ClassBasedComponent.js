// let div = document.createElement('div')
// let button = document.createElement('button')
// let divText = document.createTextNode('my text');

// let buttonText = document.createTextNode('BUTTON');

// let buttonClick = document.createTextNode('Click');


// div.appendChild(divText);
// button.appendChild(buttonText)

// button.addEventListener('click', function(event) {
//     event.preventDefault();
//     console.log('clicked')
// })

// document.body.appendChild(button);

// document.body.appendChild(div)

document.componentRegistry = {};
document.nextId = 0;

const blogPostData = {
    author: 'Brandon Smith',
    title: 'A CSS Trick',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

class Component {
    constructor() {
      this._id = ++document.nextId;
      document.componentRegistry[this._id] = this;
    }
  }

  class BlogPost extends Component {

    constructor(props, children) {
      super(props);

      this.children = children;
      this.state = {
        author: props.author,
        title: props.title,
        body: props.body
      }
    }

    render() {
      return `<div class="post">
                <h1>${this.state.title}</h1>
                <h3>By ${this.state.author}</h3>
                <textarea onchange="document.componentRegistry[${this._id}].setBody(this.value)">
                  ${this.state.body}
                </textarea>
                <div>
                  ${this.children.render()}
                </div>
              </div>`;
    }

    setBody(newBody) {
      this.state.body = newBody;
      update();
    }

  }

class adComponents {
  render() {
    return (
      `
        <h1>hi</h1>
      `
    )
  }
}

let anotherComponent = new adComponents;

let blogPostComponent = new BlogPost(blogPostData, anotherComponent)
console.log('blogPostComponent: ',blogPostComponent)

function update() {
    document.querySelector('body').innerHTML = blogPostComponent.render();
}

let inputElement = document.querySelector('.input')
let paragraphElement = document.querySelector('.paragraph')
console.log('inputElement: ',inputElement)

inputElement.addEventListener('change', (event) => {
    console.log(event.target.value)
    blogPostComponent.setBody(event.target.value)
    paragraphElement.innerHTML = blogPostComponent.state.body
    blogPostComponent.setConsole()
})

console.log('blogPostComponent.render()',blogPostComponent.render())

document.querySelector('#root').innerHTML = blogPostComponent.render()