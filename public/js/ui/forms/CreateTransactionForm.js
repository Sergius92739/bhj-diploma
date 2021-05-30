
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        this.select = this.element.querySelector(".accounts-select");
        this.select.innerHTML = "";
        response.data.forEach(elem => {
          this.select.insertAdjacentHTML("beforeend", `
          <option value="${elem.id}">${elem.name}</option>
        `)
        });
        
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    // data.type = this.element.id == "new-income-form" ? "income" : "expense";
    if(this.element.closest('#modal-new-income')) {
      data.type = 'income'
    }
    else data.type = 'expense'
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        new Modal(this.element.closest(".modal")).close();
      }
    })
  }
}