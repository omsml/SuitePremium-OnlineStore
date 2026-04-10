/* SUITE PREMIUM RETAIL - BACKEND SERVICE
   Package: com.suite.app
   Features: Product Management, Order Fulfillment, MySQL Sync, User Auth
*/

package com.suite.app;

import lombok.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class SuiteBackend {
    public static void main(String[] args) {
        SpringApplication.run(SuiteBackend.class, args);
    }
}

// --- ENTITIES ---

@Entity  
@Data 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "products")
class Product {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String brand;
    private Double price;
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String thumbnail;
    
    private Double rating;
}

@Entity 
@Data 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "orders")
class Order {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private Double totalBill;
    private String paymentMethod;
    private String status; // PENDING, DISPATCHED
}

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    private String role = "USER";

    @Column(name = "created_at", insertable = false, updatable = false)
    private java.sql.Timestamp createdAt;

    public User() {}
}

// --- REPOSITORIES ---

interface ProductRepository extends JpaRepository<Product, Long> {}
interface OrderRepository extends JpaRepository<Order, Long> {}
interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// --- CONTROLLERS ---

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
class SuiteController {

    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public SuiteController(ProductRepository p, OrderRepository o, UserRepository u) {
        this.productRepo = p;
        this.orderRepo = o;
        this.userRepo = u;
    }

    // --- USER ENDPOINTS ---

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @PostMapping("/orders")
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PENDING");
        return orderRepo.save(order);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login attempt for: " + loginRequest.getUsername());
        
        Optional<User> userOpt = userRepo.findByUsername(loginRequest.getUsername());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        System.out.println("Registration attempt for: " + newUser.getUsername());
        
        if (userRepo.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        
        try {
            User savedUser = userRepo.save(newUser);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    // --- ADMIN ENDPOINTS ---

    @PostMapping("/admin/add-product")
    public Product addProduct(@RequestBody Product p) {
        if (p.getRating() == null) p.setRating(4.5);
        return productRepo.save(p);
    }

    @GetMapping("/admin/orders")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @PutMapping("/admin/order/{id}/dispatch")
    public Order dispatchOrder(@PathVariable Long id) {
        Order o = orderRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        o.setStatus("DISPATCHED");
        return orderRepo.save(o);
    }

    @DeleteMapping("/admin/product/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepo.deleteById(id);
    }

    @PutMapping("/admin/product/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product newDetails) {
        return productRepo.findById(id)
            .map(p -> {
                p.setTitle(newDetails.getTitle());
                p.setBrand(newDetails.getBrand());
                p.setPrice(newDetails.getPrice());
                p.setDescription(newDetails.getDescription());
                p.setThumbnail(newDetails.getThumbnail());
                p.setRating(newDetails.getRating());
                if(newDetails.getCategory() != null) p.setCategory(newDetails.getCategory());
                return productRepo.save(p);
            })
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // NEW: Order Cancellation Endpoint
    @DeleteMapping("/admin/order/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepo.deleteById(id);
    }
}
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
class ViewController {

    @GetMapping("/")
    public String home() {
        return "index"; // loads index.html
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin"; // loads admin.html
    }
}
