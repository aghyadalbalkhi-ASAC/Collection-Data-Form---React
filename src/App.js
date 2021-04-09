import './App.css';
import React, { Component } from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            typeofactivity: '',
            ownerName: '',
            idtype: 'هوية وطنية',
            idnum: '',
            dob: '',
            telnum: '',
            notes: 'عرض خارج المحل',
            namesofobservers: '',
            touched: {
                ownerName: false,
                idnum: false,
                telnum: false,
                dob : false,
                namesofobservers:false,
                typeofactivity:false
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let url = `https://abd-ali-form.herokuapp.com/round`;
        fetch(url,
        {
            body: JSON.stringify(this.state),
            method: "post"
        }).then(res => res.json())
        .then(res => 
            {
                if (res.rowCount !== 0){
                    alert (`${res.rows[0].ownername} تم اضافة البيانات بنجاح`);
                    document.location.href = '/'
                }
            }
            );

        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(typeofactivity,ownerName, dob, idnum, telnum,namesofobservers) {
        const errors = {
            ownerName: '',
            lastname: '',
            idnum: '',
            telnum: '',
            dob: '',
            namesofobservers: '',
            typeofactivity : '',
        };

        if (this.state.touched.ownerName && ownerName.length < 3)
            errors.ownerName = 'owner Name should be >= 3 characters';
        else if (this.state.touched.ownerName && ownerName.length > 30)
            errors.ownerName = 'owner Name should be <= 10 characters';

        if (this.state.touched.typeofactivity && typeofactivity.length < 3)
            errors.typeofactivity = 'type of activity should be >= 3 characters';
        else if (this.state.touched.typeofactivity && typeofactivity.length > 30)
            errors.typeofactivity = 'type of activity should be <= 10 characters';

        if (this.state.touched.dob && dob.length < 3)
            errors.dob = 'Last Name should be >= 3 characters';
        else if (this.state.touched.dob && dob.length > 10)
            errors.dob = 'Last Name should be <= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.idnum && !reg.test(idnum))
            errors.idnum = 'This Field should contain only numbers';
          const reg2 = /^\d+$/;
        if(this.state.touched.telnum && !reg2.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';

        if (this.state.touched.namesofobservers && namesofobservers.length < 3)
            errors.namesofobservers = 'observers Names should be >= 3 characters';
        else if (this.state.touched.namesofobservers && namesofobservers.length > 30)
            errors.namesofobservers = 'observers Names should be <= 10 characters';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.typeofactivity,this.state.ownerName,this.state.dob, this.state.idnum, this.state.telnum,this.state.namesofobservers);
        return(
          <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12" >
                            <h1>نموذج جمع البيانات</h1>
                            <p>يستخدم هذا النموذج من قبل المراقب لتعبئة المعلومات الخاصة بالجولات</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>

            
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>قم بتعبئة النموذج أدناه</h3>
                    </div>
                    <br></br><br></br><br></br>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit}>

      {/* <-------------------------------------   نوع النشاط     --------------------------------------> */}

                        <FormGroup row>
                                <Label htmlFor="typeofactivity" md={12}>نوع النشاط</Label>
                                <Col md={12}>
                                    <Input type="text" id="typeofactivity" name="typeofactivity"
                                        placeholder="ادخل نوع النشاط"
                                        value={this.state.typeofactivity}
                                        required
                                        valid={errors.typeofactivity === ''}
                                        invalid={errors.typeofactivity !== ''}
                                        onBlur={this.handleBlur('typeofactivity')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.typeofactivity}</FormFeedback>
                                </Col>
                            </FormGroup>

      {/* <-------------------------------------   اسم صاحب النشاط  --------------------------------------> */}

                        <FormGroup row>
                                <Label htmlFor="ownerName" md={12}>اسم صاحب النشاط</Label>
                                <Col md={12}>
                                    <Input type="text" id="ownerName" name="ownerName"
                                        placeholder="ادخل الاسم الرباعي"
                                        value={this.state.ownerName}
                                        required
                                        valid={errors.ownerName === ''}
                                        invalid={errors.ownerName !== ''}
                                        onBlur={this.handleBlur('ownerName')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.ownerName}</FormFeedback>
                                </Col>
                            </FormGroup>

      {/* <-------------------------------------   نوع الاثبات   --------------------------------------> */}
                        <FormGroup row>
                            <Label htmlFor="idtype" md={12}>نوع الاثبات</Label>
                            <Col md={{size: 2,offset:10}}>{/* , offset: 1 */}
                                <Input type="select" name="idtype"
                                    required
                                        value={this.state.idtype}
                                        onChange={this.handleInputChange}>
                                    <option>ترخيص</option>
                                    <option>سجل تجاري</option>
                                    <option>هوية وطنية</option>
                                    <option>اقامه</option>
                                </Input>
                            </Col>
                        </FormGroup>

      {/* <-------------------------------------   رقمه  --------------------------------------> */}

                            <FormGroup row>
                                <Label htmlFor="idnum" md={12}>رقمه</Label>
                                <Col md={12}>
                                    <Input type="tel" id="idnum" name="idnum"
                                        placeholder="رقم الاثبات"
                                        required
                                        value={this.state.idnum}
                                        valid={errors.idnum === ''}
                                        invalid={errors.idnum !== ''}
                                        onBlur={this.handleBlur('idnum')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.idnum}</FormFeedback>
                                </Col>
                            </FormGroup>

      {/* <-------------------------------------   تاريخ الميلاد  --------------------------------------> */}

                            <FormGroup row>
                                <Label htmlFor="dob" md={12}>ناريخ الجولة</Label>
                                <Col md={12}>
                                    <Input type="date" id="lastname" name="dob"
                                        required
                                        placeholder="ادخل تاريخ الميلاد"
                                        value={this.state.dob}
                                        valid={errors.dob === ''}
                                        invalid={errors.dob !== ''}
                                        onBlur={this.handleBlur('dob')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.dob}</FormFeedback>
                                </Col>
                            </FormGroup>


        {/* <-------------------------------------   الجوال  --------------------------------------> */}

                            <FormGroup row>
                                <Label htmlFor="telnum" md={12}>الجوال</Label>
                                <Col md={12}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="ادخل رقم الجوال"
                                        required
                                        value={this.state.telnum}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''}
                                        onBlur={this.handleBlur('telnum')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>

      {/* <-------------------------------------   الملاحظات   --------------------------------------> */}
      <FormGroup row>
                        <Label htmlFor="notes" md={12}>الملاحظات</Label>
                            <Col md={{size: 6,offset:6}}>{/* , offset: 1 */}
                                <Input type="textarea" name="notes"
                                        required
                                        rows="8"
                                        value={this.state.notes}
                                        onChange={this.handleInputChange}>
                                    
                                </Input>
                            </Col>
                        </FormGroup>

              {/* <-------------------------------------   تاريخ الميلاد  --------------------------------------> */}

                        <FormGroup row>
                            <Label htmlFor="namesofobservers" md={12}>اسماء المراقبين</Label>
                            <Col md={12}>
                                <Input type="text" id="lastname" name="namesofobservers"
                                    placeholder="اسماء المراقبين"
                                    required
                                    value={this.state.namesofobservers}
                                    valid={errors.namesofobservers === ''}
                                    invalid={errors.namesofobservers !== ''}
                                    onBlur={this.handleBlur('namesofobservers')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.namesofobservers}</FormFeedback>
                            </Col>
                        </FormGroup>


                            <FormGroup row>
                                <Col md={{size: 12, offset: 0}}>
                                    <Button type="submit" color="primary">
                                        ارسال
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default App;