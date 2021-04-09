import './App.css';
import React, { Component } from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            typeofactivity: 'محل تجاري',
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
                namesofobservers:false
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
        let url = `http://localhost:3031/round`;
        fetch(url,
        {
            body: JSON.stringify(this.state),
            method: "post"
        }).then(res => res.json())
        .then(res => 
            {
                if (res.rowCount !== 0){
                    alert (`${res.rows[0].ownername} تم اضافة البيانات بنجاح`);
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

    validate(ownerName, dob, idnum, telnum,namesofobservers) {
        const errors = {
            ownerName: '',
            lastname: '',
            idnum: '',
            telnum: '',
            dob: '',
            namesofobservers: '',
        };

        if (this.state.touched.ownerName && ownerName.length < 3)
            errors.ownerName = 'owner Name should be >= 3 characters';
        else if (this.state.touched.ownerName && ownerName.length > 30)
            errors.ownerName = 'owner Name should be <= 10 characters';

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
        const errors = this.validate(this.state.ownerName,this.state.dob, this.state.idnum, this.state.telnum,this.state.namesofobservers);
        return(
          <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6" >
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>

            
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <br></br><br></br><br></br>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>

      {/* <-------------------------------------   نوع النشاط     --------------------------------------> */}
                        <FormGroup row>
                        <Label htmlFor="typeofactivity" md={12}>نوع النشاط</Label>
                            <Col md={{size: 3,offset:9}}>{/* , offset: 1 */}
                                <Input type="select" name="typeofactivity"
                                        required
                                        value={this.state.typeofactivity}
                                        onChange={this.handleInputChange}>
                                    <option>محل تجاري</option>
                                    <option>محل تجاري متعلق بالصحة العامة</option>
                                    <option>مركز تجاري ليس له علاقة بالصحة العامه</option>
                                    <option>بائع متجول</option>
                                    <option>عربة اطعمه</option>
                                    <option>بسطه عشوائيه</option>
                                </Input>
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
                            <Col md={{size: 3,offset:9}}>{/* , offset: 1 */}
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
                                <Label htmlFor="dob" md={12}>ناريخ الميلاد</Label>
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
                            <Col md={{size: 5,offset:7}}>{/* , offset: 1 */}
                                <Input type="select" name="notes"
                                        required
                                        value={this.state.notes}
                                        onChange={this.handleInputChange}>
                                    <option>لايوجد ملاحظات</option>
                                    <option>عرض خارج المحل</option>
                                    <option>عدم التقيدباشتراطات الصحة العامة</option>
                                    <option>عدم تجديد الترخيص</option>
                                    <option>عدم وجود ترخيص</option>
                                    <option>عدم الاهتمام بنظافة الاواني</option>
                                    <option>تدني مستوى النظافة للمحل</option>
                                    <option>عدم الاهتمام بتقليم الاظافر</option>
                                    <option>عدم الاهمتام بقص الشعر</option>
                                    <option>عدم وجود شهادات صحية</option>
                                    <option>تعطيل المراقبين /هروب العاملين</option>
                                    <option>وجود مواد منتهية</option>
                                    <option>شهادات صحية منتهية</option>
                                    <option>فتح المحل دون الحصول على ترخيص</option>
                                    <option>بائع متجول</option>
                                    <option>بسطه عشوائيه</option>
                                    <option>عدم وجود ستاره هوائيه</option>
                                    <option>عدم وجود مصيدة حشرات</option>
                                    <option>عدم لبس الكمامات</option>
                                    <option>عدم لبس القفازات</option>
                                    <option>مخالفة اللوحة للترخيص</option>
                                    <option>فتح المحل بعد الاغلاق دون مراجعة الامانه</option>
                                    <option>تسريب المياه</option>
                                    <option>عدم التقيد بالزي المناسب</option>
                                    <option>عدم تغطية اللحم</option>
                                    <option>عدم وجود شهاده ذبح</option>
                                    <option>وجود مستودع بدون ترخيص</option>
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
                                <Col md={{size: 10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
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