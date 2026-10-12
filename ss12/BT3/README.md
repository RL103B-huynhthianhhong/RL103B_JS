# PHÂN TÍCH TRADE-OFF: MONOLITHIC VS MODULAR

## 1. Bảng so sánh kỹ thuật

| Tiêu chuẩn | Monolithic Switch-Case | Modular Function Architecture |
|---|---|---|
| Độ dài khối switch | Chứa nhiều dòng xử lý nghiệp vụ, khó đọc và khó quản lý | Ngắn gọn, mỗi case chỉ gọi hàm tương ứng |
| Khả năng bảo trì | Khó sửa lỗi vì logic nằm chung một khối | Dễ sửa từng chức năng độc lập |
| Khả năng tái sử dụng | Thấp vì logic gắn chặt với menu CLI | Cao hơn vì hàm có thể được gọi từ nhiều nơi |
| Kiểm thử độc lập | Khó kiểm thử riêng từng chức năng | Dễ kiểm thử từng hàm riêng biệt |
| Khả năng mở rộng từ 5 lên 20 chức năng | Switch-case dài hơn, dễ nhầm lẫn và phát sinh lỗi | Dễ thêm hàm mới và thêm case tương ứng |
| Nguyên lý SRP | Một khối mã có thể đảm nhiệm nhiều trách nhiệm | Mỗi hàm tập trung vào một nhiệm vụ cụ thể |
| Độ phức tạp ban đầu | Thấp, dễ viết với chương trình nhỏ | Cần thời gian thiết kế và tách hàm |
| Độ phù hợp | Bài tập nhỏ, ít chức năng | Chương trình có nhiều chức năng, cần bảo trì lâu dài |

## 2. Phân tích Trade-off

**Monolithic Switch-Case:** Có ưu điểm là dễ viết và dễ hiểu với chương trình nhỏ. Tuy nhiên, khi số lượng chức năng tăng từ 5 lên 20, khối switch-case sẽ dài hơn, khó tìm lỗi và khó kiểm thử từng nghiệp vụ.

**Modular Function Architecture:** Có ưu điểm là phân chia chương trình thành các hàm độc lập, giúp mã nguồn rõ ràng, dễ bảo trì, dễ kiểm thử và dễ mở rộng. Nhược điểm là cần thời gian thiết kế và tổ chức hàm ban đầu.

## 3. Nguyên lý Single Responsibility Principle (SRP)

SRP là nguyên lý Đơn nhiệm, theo đó mỗi hàm nên tập trung vào một trách nhiệm cụ thể.

Ví dụ:
- `addSubscription()` chỉ thêm thuê bao mới.
- `listSubscriptions()` chỉ hiển thị danh sách thuê bao.
- `updateSubscription()` chỉ cập nhật gói cước.
- `deleteSubscription()` chỉ hủy thuê bao.

Menu chỉ có nhiệm vụ nhận lựa chọn và gọi hàm phù hợp.

## 4. Kết luận

Đối với ứng dụng quản lý thuê bao RikkeiStream, kiến trúc hàm mô-đun hóa phù hợp hơn khi số lượng chức năng tăng lên. Mặc dù cần tổ chức mã nguồn ban đầu, cách tiếp cận này giúp giảm sự phụ thuộc giữa menu và nghiệp vụ, đồng thời nâng cao khả năng bảo trì, kiểm thử và mở rộng.