<!-- <div id="report" >
    <span>Updating Please Wait</span>
    <i class="fas fa-spinner"></i>
</div>
<div id="notification" class="notification-con btn-shadow">
    <div id="notification-close">
        <i class="fas fa-caret-right"></i>
    </div>
    <h2>Notification Title</h2>
    <span>Notification Message </span>
</div>
<div id="action">
    <div class="actionbar btn-shadow">
        <h2 id="action-title">Confirm Delete Group?</h2>
        <div class="action-pick-con">
            <span id="action-select-yes">yes<i class="fas fa-check-circle"></i></span>
            <span id="action-select-no">no<i class="fas fa-times-circle"></i></span>
        </div>
    </div>
</div> -->
<div id="profile" class="hidden">
    <div class="profile-container">
        <div id="profile-container-login" class="login hidden">
            <span>Login or Register</span>
            <input id="profile-login-email" type="text" placeholder="Email">
            <input id="profile-login-password" type="password" placeholder="Password">
            <button id="profile-login-submit" class="default-button">Login</button>
            <span class="register">Dont have an account yet? <a href="<?php echo($rootLocation . 'pages/contact'); ?>">Register Here</a></span>
        </div>
        <div id="profile-container-userprofile" class="userprofile hidden">
            <div class="nav">
                <i class="fas fa-user userprofile-user active"></i>
                <i class="fas fa-envelope userprofile-envelope"></i>
                <i class="fas fa-receipt userprofile-receipt"></i>
                <i class="fas fa-times userprofile-close"></i>
            </div>
            <br>

            <div class="userprofile-wild-con info userprofile-user-con ">
                <input id="userprofile-user-con-email" type="text" placeholder="Email" disabled>
                <input id="userprofile-user-con-firstname" type="text" placeholder="Firstname" disabled value="Noel">
                <input id="userprofile-user-con-lastname" type="text" placeholder="Lastname" disabled>
                <input id="userprofile-user-con-phone" type="text" placeholder="Phone Number" disabled>
                <input id="userprofile-user-con-companyname" type="text" placeholder="Company Name" disabled>
                <input id="userprofile-user-con-oldpassword" class="hidden" type="password" placeholder="Password">
                <input id="userprofile-user-con-newpassword" class="hidden" type="password" placeholder="New Password">
                <input id="userprofile-user-con-confirmpassword" class="hidden" type="password" placeholder="New Password Confirm">
                <button id="userprofile-user-con-update" class="default-button userprofile-user-btn-d">Update Information</button>
                <button id="userprofile-user-con-changepassword" class="default-button userprofile-user-btn-d">Change Password</button>
                <button id="userprofile-user-con-logout" class="default-button userprofile-user-btn-d">Logout</button>

                <button id="userprofile-user-con-update-c" class="default-button hidden userprofile-user-btn-h">Confirm Update</button>
                <button id="userprofile-user-con-changepassword-c" class="default-button hidden userprofile-user-btn-h">Confirm Password Change</button>
            </div>

            <div class="userprofile-wild-con message userprofile-envelope-con hidden">
                <div id="userprofile-envelope-chatbox" class="chatbox">
                    <div class="widget user">
                        <i class="fas fa-user"></i>
                        <span>Hello there!</span>
                        <span>I'd Like to inquire about Pro Flow!</span>
                        <span class="timestamp">2020-04-08 17:04:00</span>
                    </div>
                    <div class="widget system">
                        <i class="fas fa-user-astronaut"></i>
                        <span>Hi Tony, Proflow Manuals and Materials are on the Website. Please Navigate to <a href="">Set Up Guide</a> Section. If you need more assistance please dont hesitate to contact us further. Thank you.</span>
                        <span class="timestamp">2020-04-08 17:04:00</span>
                    </div>
                </div>
                <textarea id="userprofile-envelope-message" name="" id="" placeholder="Maximum Length 500" title="Only Letters, Numbers and thse characters .,?!@() are allowed"></textarea>
                <button id="userprofile-envelope-submit" class="default-button">Send Message<i class="fab fa-telegram-plane"></i></button>
            </div>

            <div class="userprofile-wild-con billing userprofile-receipt-con hidden">

                <div class="billing-widget">
                    <div class="title billing-widget-title-h">
                        <span class="billid">BIL-987987932875</span>
                    </div>
                    <div class="title billing-widget-title-h">
                        <span>Proflow</span>
                        <span>in 3 Months</span>
                        <i class="fas fa-circle"></i>
                    </div>
                    <div class="title billing-widget-title-h">
                        <span>Doc Flow</span>
                        <span>in 3 Months</span>
                        <i class="fas fa-circle"></i>
                    </div>
                    <div class="details hidden">
                        
                        <div class="detailspeck">
                            <span>Billing Date:</span>
                            <span>2020-09-03</span>
                        </div>
                        <hr>
                        <div class="detailspeck">
                            <span>Pro Flow</span>
                            <span>$120.00</span>
                        </div>
                        <div class="detailspeck">
                            <span>Doc Builder</span>
                            <span>$0.00</span>
                        </div>
                        <div class="detailspeck">
                            <span>Subtotal:</span>
                            <span>$120.00</span>
                        </div>
                        <div class="detailspeck">
                            <span>GST/HST:</span>
                            <span>$12.00</span>
                        </div>
                        <div class="detailspeck">
                            <span>Total:</span>
                            <span>$132.00</span>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
</div>
<div id="cart" class="hidden">
    <div class="cart-container">
        <div class="nav">
            <span class="title"><i class="fas fa-shopping-bag"></i>Cart</span>
            <i class="fas fa-times usercart-close"></i>
        </div>
        <div id="cart-container-widget-con" class="list">

            <div class="widget">
                <div class="title">
                    <span>Pro Flow</span>
                    <span>3 Months</span>
                </div>
                <div class="details">
                    <div class="detailspeck">
                        <span>License Expiry</span>
                        <span>2020-09-02</span>
                    </div>
                    <div class="detailspeck">
                        <span>Subtotal</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <button class="default-button-mini cart-widget-remove">Remove <i class="fas fa-trash"></i></button>
            </div>
            <div class="widget">
                <div class="title">
                    <span>Pro Flow</span>
                    <span>3 Months</span>
                </div>
                <div class="details">
                    <div class="detailspeck">
                        <span>License Expiry</span>
                        <span>2020-09-02</span>
                    </div>
                    <div class="detailspeck">
                        <span>Subtotal</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <button class="default-button-mini cart-widget-remove">Remove <i class="fas fa-trash"></i></button>
            </div>
            <div class="widget">
                <div class="title">
                    <span>Pro Flow</span>
                    <span>3 Months</span>
                </div>
                <div class="details">
                    <div class="detailspeck">
                        <span>License Expiry</span>
                        <span>2020-09-02</span>
                    </div>
                    <div class="detailspeck">
                        <span>Subtotal</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <button class="default-button-mini cart-widget-remove">Remove <i class="fas fa-trash"></i></button>
            </div>
            
            <div class="widget totals">
                <div class="details">
                    <div class="detailspeck">
                        <span>Subtotal</span>
                        <span>$120</span>
                    </div>
                    <div class="detailspeck">
                        <span>HST/HST</span>
                        <span>$12.00</span>
                    </div>
                    <div class="detailspeck">
                        <span>Total</span>
                        <span>$132.00</span>
                    </div>
                </div>
                <button id="cart-container-widget-checkout" class="default-button-mini">Checkout</button>
            </div>

        </div>

    </div>
</div> 
<div id="toast" class="hidden">
    <span>Message</span>
</div>