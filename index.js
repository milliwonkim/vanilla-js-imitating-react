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
    constructor(props) {
        super(props)
        this.state = {
            author: props.author,
            title: props.title,
            body: props.body,
            changed: ''
        }
    }

    setBody(newBody) {
        console.log('newBody in setBody: ', newBody)
        this.state.body = newBody;
        update()
    }

    setConsole() {
        console.log('this.state.body: ',this.state.body)
    }

    render() {
        return `
            <div class="post">
                <h1>${this.state.title}</h1>
                <h3>By ${this.state.author}</h3>
                <textarea onchange="document.componentRegistry[${this._id}].setBody(this.value)">${this.state.body}</textarea>
                <h1>${this.state.changed}</h1>
            </div>
        `;
    }

}


let blogPostComponent = new BlogPost(blogPostData)

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

document.querySelector('#root').innerHTML = blogPostComponent.render()