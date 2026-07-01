# 67164494-WORKSHOP1

## 1. บทนำและความเป็นมา
* SALA STORE - Project Design Document
* Project ของวิชา CSI204 SUMMER SEMESTER 3/2568 เสนออาจารย์ทินภัทร บริรักษ์
* ระบบ E - Commerce สำหรับร้านขายเสื้อผ้าแบรนด์ SALA รองรับ 2 บทบาทผู้ใช้งานคือ Customer และ Admin

## 2. สมาชิกในกลุ่ม
* 67098506 - ปัณณพรรธน์ เกียรตินิรชา
* 67164494 - ฐิติฉัตร ศิริบุตร
* 67172467 - สุรวัศ แสงเจริญสุขเลิศ 
* 67173986 - อินทัช ชายเพ็ชร
* 67176203 - ภทรพร แซ่ลี้

---

## 3. ที่มาและความสำคัญ (Rationale)
ในปัจจุบันธุรกิจการซื้อขายเสื้อผ้าออนไลน์ (E-Commerce) เติบโตขึ้นอย่างรวดเร็ว แต่ปัญหาสำคัญที่ร้านค้าส่วนใหญ่ต้องเผชิญคือระบบจัดการหลังบ้านที่กระจัดกระจาย การควบคุมสต็อกสินค้าที่ไม่แม่นยำ และขาดการนำข้อมูลมาวิเคราะห์เพื่อเพิ่มยอดขาย แบรนด์ **SALA (ศาลา)** จึงได้คิดค้นแพลตฟอร์มนี้ขึ้นเพื่อรวมระบบการเลือกซื้อสินค้าเสื้อผ้าแฟชั่นที่ไร้รอยต่อ และหน้าจอสรุปข้อมูลสถิติสำหรับผู้ดูแลระบบ (Admin Dashboard) เข้าไว้ด้วยกัน เพื่อเพิ่มประสิทธิภาพในการบริหารคลังสินค้าและการตัดสินใจทางธุรกิจให้เบ็ดเสร็จในแพลตฟอร์มเดียว

## 4. วัตถุประสงค์ของโครงงาน (Objectives)
* เพื่อพัฒนาและออกแบบระบบเว็บแอปพลิเคชัน E-Commerce สำหรับร้านเสื้อผ้าแบรนด์ SALA ให้มีประสิทธิภาพและใช้งานง่าย
* เพื่อออกแบบและพัฒนาระบบหลังบ้านสำหรับ Admin ในการควบคุมสต็อกสินค้าเสื้อผ้าและจัดการหมวดหมู่ได้อย่างถูกต้อง
* เพื่อสร้างระบบรายงานและสรุปข้อมูล (Admin Dashboard) ที่ช่วยให้ผู้ดูแลระบบมองเห็นภาพรวมยอดขายและวิเคราะห์สินค้าขายดีได้อย่างแม่นยำ

## 5. ความต้องการของผู้ใช้งาน (User Requirements)
ระบบมีผู้ใช้งานหลัก 2 กลุ่ม คือ:
* **ลูกค้า (Customer)**
  * สมัครสมาชิก / เข้าสู่ระบบ
  * ค้นหาและเลือกซื้อสินค้าเครื่องแต่งกาย
  * เพิ่มสินค้าลงตะกร้า (Cart)
  * สั่งซื้อสินค้าและชำระเงินจำลอง (Checkout)
  * ดูประวัติการสั่งซื้อ (Buy History)
* **ผู้ดูแลระบบ (Admin)**
  * จัดการข้อมูลสินค้า (เพิ่ม / แก้ไข / ลบ)
  * จัดการหมวดหมู่สินค้า (Category)
  * จัดการผู้ใช้งานในระบบ และตรวจสอบข้อมูลลูกค้า
  * ดูรายงานสถิตียอดขายและข้อมูลวิเคราะห์ผ่าน Dashboard

## 6. ขอบเขตของระบบ (System Scope)
ระบบครอบคลุมฟังก์ชันหลัก 9 ส่วน ตามที่กำหนดไว้ในรายวิชา ได้แก่:
1. การจัดการสมาชิก (Register / Login)
2. การจัดการข้อมูลสินค้า (Product Management)
3. การค้นหาและแสดงรายละเอียดสินค้า (Search & View Products)
4. ระบบตะกร้าสินค้า (Shopping Cart)
5. ระบบสั่งซื้อสินค้า (Order Management)
6. ระบบชำระเงินจำลอง (Simulation)
7. ระบบติดตามสถานะคำสั่งซื้อ (Order Tracking)
8. ระบบจัดการสินค้าและคำสั่งซื้อสำหรับผู้ดูแลระบบ
9. รายงาน / Dashboard สรุปข้อมูลยอดขายเบื้องต้น

---

## 7. ความสามารถหลักของระบบ (Main Functions) & ความต้องการทางระบบ (System Requirements)

### 7.1 ความต้องการเชิงฟังก์ชัน (Functional Requirements)

**ฝั่งลูกค้า (Customer Portal)**
* **ค้นหาสินค้า (Search & Filter):** ค้นหาและคัดกรองเสื้อผ้าตามชื่อแบรนด์ หมวดหมู่ ราคา และไซส์
* **ตะกร้าสินค้าและการชำระเงิน (Cart & Checkout):** บันทึกรายการสินค้าเสื้อผ้าที่ต้องการซื้อ คำนวณราคารวม กรอกข้อมูลที่อยู่จัดส่ง และเข้าสู่กระบวนการชำระเงินจำลอง
* **การจัดการสมาชิก (Auth):** สมัครสมาชิกและเข้าสู่ระบบเพื่อใช้งานส่วนตัว พร้อมทั้งสามารถเรียกดูประวัติการสั่งซื้อย้อนหลัง (Buy History) ได้

**ฝั่งผู้ดูแลระบบ (Admin Dashboard)**
* **จัดการสินค้าและคลังสินค้า (Product & Stock Management):** อัปโหลดรูปภาพสินค้าเสื้อผ้า คอลเลกชันใหม่ กำหนดราคา ลบสินค้า และอัปเดตจำนวนสต็อกสินค้าในคลัง
* **จัดการหมวดหมู่ (Category Management):** เพิ่ม ลบ หรือแก้ไขหมวดหมู่เสื้อผ้า (เช่น เสื้อยืด, กางเกง, แจ็คเก็ต) ให้สอดคล้องกับสินค้าใหม่
* **รายงานสรุปยอดขาย (Sales Dashboard):** แสดงกราฟและตัวเลขสรุปรายได้รวม สถิติออเดอร์เสื้อผ้าที่ขายดีที่สุด และรายงานยอดคำสั่งซื้อที่รอการจัดส่ง

### 7.2 ความต้องการที่ไม่ใช่เชิงฟังก์ชัน (Non-Functional Requirements)
* **ความปลอดภัย (Security):** ใช้โปรโตคอล HTTPS ตลอดทั้งระบบ, เข้ารหัสผ่านบัญชีผู้ใช้ด้วย Algorithm ที่ปลอดภัย และใช้ระบบ JWT (JSON Web Token) ในการยืนยันสิทธิ์เข้าถึง API
* **ความสามารถในการปรับขยาย (Scalability):** มีโครงสร้างสถาปัตยกรรมระบบและ Database ที่ยืดหยุ่น รองรับการสืบค้นข้อมูลสินค้าได้อย่างรวดเร็วแม้มีปริมาณสินค้าเพิ่มขึ้น
* **ความน่าเชื่อถือและความพร้อมใช้งาน (Reliability & Availability):** ระบบต้องมีความเสถียร สามารถเข้าใช้งานเลือกซื้อเสื้อผ้าได้ตลอด 24 ชั่วโมง และจัดการซอร์สโค้ดของทีมผ่าน GitHub

---

## 8. ผังการทำงานและโครงสร้างระบบ (System Diagrams)

### 8.1 Use Case Diagram
```mermaid
graph TD
    Customer((Customer))
    Admin((Admin))

    subgraph SALA_STORE_System [SALA STORE System]
        UC_Auth(Log in / Register)
        UC_Profile(Manage Profile)
        UC_Search(Search & Filter Clothes)
        UC_Cart(Manage Shopping Cart)
        UC_Checkout(Checkout & Simulation)
        UC_History(View Buy History)
        UC_ManageProduct(Manage Products & Inventory)
        UC_ManageCategory(Manage Categories)
        UC_ManageUser(Manage Users)
        UC_Dashboard(View Sales Report & Dashboard)
    end

    Customer --> UC_Auth
    Customer --> UC_Profile
    Customer --> UC_Search
    Customer --> UC_Cart
    Customer --> UC_Checkout
    Customer --> UC_History

    Admin --> UC_Auth
    Admin --> UC_ManageProduct
    Admin --> UC_ManageCategory
    Admin --> UC_ManageUser
    Admin --> UC_Dashboard

### 8.2 Class Diagram
classDiagram
    class User {
        +int id
        +string email
        +string password_hash
        +string role
        +register()
        +login()
    }

    class Product {
        +int id
        +string name
        +string description
        +double price
        +int stock
        +int category_id
        +updateStock()
    }

    class Category {
        +int id
        +string name
    }

    class Cart {
        +int id
        +int user_id
        +addItem()
        +removeItem()
        +clearCart()
    }

    class CartItem {
        +int id
        +int cart_id
        +int product_id
        +int quantity
    }

    class Order {
        +int id
        +int user_id
        +double total_price
        +string status
        +datetime created_at
        +createOrder()
        +updateStatus()
    }

    class OrderItem {
        +int id
        +int order_id
        +int product_id
        +int quantity
        +double price
    }

    User "1" --> "0..1" Cart : has
    User "1" --> "0..*" Order : places
    Category "1" --> "0..*" Product : contains
    Cart "1" --> "0..*" CartItem : contains
    Product "1" --> "0..*" CartItem : added_to
    Order "1" --> "0..*" OrderItem : consists_of
    Product "1" --> "0..*" OrderItem : ordered_in

### 8.3 Sequence Diagram
classDiagram
    class User {
        +int id
        +string email
        +string password_hash
        +string role
        +register()
        +login()
    }

    class Product {
        +int id
        +string name
        +string description
        +double price
        +int stock
        +int category_id
        +updateStock()
    }

    class Category {
        +int id
        +string name
    }

    class Cart {
        +int id
        +int user_id
        +addItem()
        +removeItem()
        +clearCart()
    }

    class CartItem {
        +int id
        +int cart_id
        +int product_id
        +int quantity
    }

    class Order {
        +int id
        +int user_id
        +double total_price
        +string status
        +datetime created_at
        +createOrder()
        +updateStatus()
    }

    class OrderItem {
        +int id
        +int order_id
        +int product_id
        +int quantity
        +double price
    }

    User "1" --> "0..1" Cart : has
    User "1" --> "0..*" Order : places
    Category "1" --> "0..*" Product : contains
    Cart "1" --> "0..*" CartItem : contains
    Product "1" --> "0..*" CartItem : added_to
    Order "1" --> "0..*" OrderItem : consists_of
    Product "1" --> "0..*" OrderItem : ordered_in
