// Decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    console.log('iniitiated autobind');
  const originalMethod = descriptor.value;
  const updatedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
        console.log('iniitiated get');
      return originalMethod.bind(this);
    },
  };
  return updatedDescriptor;
}

// Project
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";
    this.attach();
    this.titleInputElement = document.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descInputElement = document.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = document.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const projectInput = new ProjectInput();
