class Quiz{
    constructor(id ,question,option1,option2, option3,option4,rightAnswer ){
        this.id=id;
        this.question=question;
        this.option1=option1;
        this.option2=option2;
        this.option3=option3;
        this.option4=option4;
        this.rightAnswer=rightAnswer;
    }
}
module.exports=Quiz;