 class Calculator{
    constructor(income, age, gender, status, numOfDep){
        this._income = income;
        this._age = age;
        this._gender = gender;
        this._status = status;
        this._numOfDep = numOfDep;
    }
    // getUserInputs(){
    //     return [this._income, this._age, this._gender, this._status,];
    // }
    
    getRandomNumber(){
        return Math.round(Math.random() * (15 -10 + 1) + 10);
    }

    getCategories() {
        return ['Tithe','Housing', 'Transportation', 'Food', 'Dependents', 'Entertainment', 'Loans', 'Savings', 'Groceries', 'Vacation', 'Projects', 'Gym', 'Musical Instruments', 'Education', 'Hunting'];
      
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
        document.getElementById("status").value = "";
        
    }
    hidepage(id, displayFormat){
        document.getElementById(id).style.display = displayFormat;
    }
    removeStyle(className, name){
        document.getElementById(className).className = name;
    }
}
class Result extends Calculator{
    
    display(){
        const ui = new UI;
        ui.hidepage('first', 'none');
        ui.hidepage('second', 'block');
        ui.removeStyle('row', '');
        // document.getElementById('first').style.display = 'none';
        // document.getElementById('second').style.display = 'block';
        // document.getElementById('row').className = '';
        document.getElementsByClassName('header')[1].style ='';
        document.getElementsByClassName('header')[1].classList.add('header-div');
        document.getElementById('numOfDep').textContent = this._numOfDep;
        document.getElementById('incomeV').textContent = `${this._income}`;
        document.getElementById('ageV').textContent = this._age;
        document.getElementById('statusV').textContent = this._status.toUpperCase();
        document.getElementById('genderV').textContent = this._gender.toUpperCase();




    }
    
    populateTableRows(){
        // console.log(this.numOfDep);
        
        let tbody = document.querySelector('#tbody');
        
        let length = this.getRandomNumber();
        console.log(length);
        let sumI = 0, percentI = 0;
        this.getCategories().forEach((item, index) =>{
            let percent;
            if( index < length ){
                if(this._numOfDep < 3){
                    percent = 0.2;
                }
                else{
                    percent = 0.4;

                }
                if(item == "Tithe"){
                    percentI += 0.1;
                    sumI += this._income * 0.10;
                    tbody.innerHTML += `
                        <tr>
                            <th>${index+1}</th>
                            <td>${item}</td>
                            <td>${0.10 *100}</td>
                            <td>${Math.round(this._income * 0.10)}</td>
                            
                        </tr>`;
                }
                else if(item == "Dependents"){
                    percentI += percent;
                    sumI += this._income * percent;
                    tbody.innerHTML += `
                        <tr>
                            <th>${index+1}</th>
                            <th>${item}</th>
                            <td>${percent * 100}</td>
                            <td>${Math.round(this._income * percent)}</td>
                            
                        </tr>`;
                }
                else{
                    let percentOthers =(1-percent-0.10) / (length-2);
                    percentI += percentOthers;
                    sumI += +((this._income * percentOthers).toFixed(4));
                    tbody.innerHTML += `

                        <tr>

                            <th>${index+1}</th>
                            <th>${item}</th>
                            <td>${(percentOthers * 100).toFixed(2)}</td>
                            <td>${(this._income * percentOthers).toFixed(2)}</td>
                            
                        </tr>`;
                }
                

            }


        });
        tbody.innerHTML += `
            <tr style="color: black; font-weight: bold">
                <th></th>
                <th>Total</th>
                <td>${Math.round(percentI * 100)}%</td>
                <td>&#8358;${Math.round(sumI)}</td>
                
            </tr>`;
        // console.log(tr +'<br>'+ sum);
        return tbody;
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
        console.log(age+' '+gender+' '+status+' '+income+' '+numOfDep);
    }
    else{
        // console.log(typeof age);
        // ui.showAlert('Successfully Collected', 'success');
        ui.clearFields();
        const result = new Result(income, age, gender, status, numOfDep);
        console.log(result);
        result.display();
        result.populateTableRows();
        

    }
    a.preventDefault();
    
});
document.getElementById('submitB').addEventListener('click', (e) => {

    const ui = new UI;
    ui.hidepage('first', 'block');
    ui.hidepage('second', '');
    ui.removeStyle('row', 'row');
        
    // document.getElementById('first').style.display = 'block';
    // document.getElementById('second').style.display = 'none';
    // document.getElementById('row').className = 'row';
    document.querySelector('#tbody').innerHTML = '';
    
    e.preventDefault();
});