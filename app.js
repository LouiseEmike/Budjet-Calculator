class Calculator{
    constructor(income, age, gender, status, numOfDep){
        this.income = income;
        this.age = age;
        this.gender = gender;
        this.status = status;
        this.numOfDep = numOfDep;
    }
    setRandomNumber(){
        return Math.round(Math.random() * (15 -10 + 1) + 10);
    }

    categories() {
        let categories = ['Tithe','Housing', 'Transportation', 'Food', 'Dependents', 'Entertainment', 'Loans', 'Savings', 'Groceries', 'Vacation', 'Projects', 'Gym', 'Musical Instruments', 'Education'];
        return categories;
    }

}
class UI{
    showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.form-div');
        const form = document.querySelector('#calculator');
        container.insertBefore(div, form);
        document.getElementById("submit").disabled = true;
        setTimeout(()=>{
            document.querySelector('.alert').remove();
            document.getElementById("submit").disabled = false;
        }, 3000);

    }
    clearFields(){
        document.getElementById('income').value ='';
        document.getElementById('age').value = '';
        document.getElementById('dependents').value ='';
        if(document.getElementById('genderM').checked){
            document.getElementById('genderM').checked = false;
        } else{
            document.getElementById('genderF').checked = false;
        }
        document.getElementById("status").options[document.getElementById("status").selectedIndex].value = '';
        
    }
}
class Result extends Calculator{
    
    display(){
        document.getElementById('first').style.display = 'none';
        document.getElementById('second').style.display = 'block';
        document.getElementById('row').className = '';
        document.getElementsByClassName('header')[1].style ='';
        document.getElementsByClassName('header')[1].classList.add('header-div');
        document.getElementById('numOfDep').textContent = this.numOfDep;
        document.getElementById('incomeV').textContent = `&#8358; ${this.income}`;
        document.getElementById('ageV').textContent = this.age;
        document.getElementById('statusV').textContent = this.status.toUpperCase();
        document.getElementById('genderV').textContent = this.gender.toUpperCase();




    }
    populateTableRows(){
        // console.log(this.numOfDep);
        
        let tr = document.querySelector('#tbody');
        
        let length = this.setRandomNumber();
        let sumI = 0, percentI = 0;
        this.categories().forEach((item, index) =>{
            let percent;
            if( index < length ){
                if(this.numOfDep < 3){
                    percent = 0.2;
                }
                else{
                    percent = 0.4;

                }
                if(item == "Tithe"){
                    percentI += 0.1;
                    sumI += this.income * 0.10;
                    tr.innerHTML += `
                        <tr>
                            <th>${index+1}</th>
                            <td>${item}</td>
                            <td>${0.10 *100}</td>
                            <td>${Math.round(this.income * 0.10)}</td>
                            
                        </tr>`;
                }
                else if(item == "Dependents"){
                    percentI += percent;
                    sumI += this.income * percent;
                    tr.innerHTML += `
                        <tr>
                            <th>${index+1}</th>
                            <th>${item}</th>
                            <td>${percent * 100}</td>
                            <td>${Math.round(this.income * percent)}</td>
                            
                        </tr>`;
                }
                else{
                    let percentOthers =(1-percent-0.10) / (length-2);
                    percentI += percentOthers;
                    sumI += +((this.income * percentOthers).toFixed(4));
                    tr.innerHTML += `

                        <tr>

                            <th>${index+1}</th>
                            <th>${item}</th>
                            <td>${(percentOthers * 100).toFixed(2)}</td>
                            <td>${(this.income * percentOthers).toFixed(2)}</td>
                            
                        </tr>`;
                }
                

            }


        });
        tr.innerHTML += `
            <tr style="color: black; font-weight: bold">
                <th></th>
                <th>Total</th>
                <td>${Math.round(percentI * 100)}%</td>
                <td>&#8358;${Math.round(sumI)}</td>
                
            </tr>`;
        // console.log(tr +'<br>'+ sum);
        return tr;
    }


}
// eventlisteners
document.getElementById('calculator').addEventListener('submit',
function form(a){
   let income = +document.getElementById('income').value,
        age = +document.getElementById('age').value,
        gender1 = document.getElementById('genderM'),
        gender2 = document.getElementById('genderF'),
        numOfDep = +document.getElementById('dependents').value,
        gender ="";
    if(gender1.checked){
        gender = gender1.value;
    }
     else if(gender2.checked){
        gender = gender2.value;
    }
    else{
        gender;
    }
    let e = document.getElementById("status"),
        status = e.options[e.selectedIndex].value;  
    
        const ui = new UI;  
        
    if(age ==='' || gender ==='' || status==='' || numOfDep === '' || income===''){
        ui.showAlert('Please fill in all fields', 'error');
    }
    else{
        // console.log(typeof age);
        // ui.showAlert('Successfully Collected', 'success');
        ui.clearFields();
        const result = new Result(income, age, gender, status, numOfDep);
        result.display();
        result.populateTableRows();

    }
    a.preventDefault();
    
});
document.getElementById('submitB').addEventListener('click', (e) => {
        
    document.getElementById('first').style.display = 'block';
    document.getElementById('second').style.display = 'none';
    document.getElementById('row').className = 'row';
    
    e.preventDefault();
});