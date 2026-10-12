# DÒ VẾT VÀ SỬA LỖI GRACE PERIOD

## 1. Phân tích lỗi

**Vị trí lỗi:** Điều kiện `if (sub.daysOverdue >= 3)` trong hàm `auditSubscriptions()`.

**Nguyên nhân:** Toán tử `>= 3` khiến hệ thống hạ cấp thuê bao ngay khi số ngày nợ cước bằng 3. Điều này không đúng với chính sách của StreamHub vì khách hàng vẫn được sử dụng gói cũ trong 3 ngày đầu của thời gian ân hạn.

**Cách sửa:** Thay điều kiện `sub.daysOverdue >= 3` bằng `sub.daysOverdue > 3`.

- Nếu `daysOverdue` từ 1 đến 3: Giữ nguyên gói thuê bao và giới hạn thiết bị, cập nhật trạng thái `GRACE_PERIOD`.
- Nếu `daysOverdue > 3`: Hạ cấp về gói `FREE`, đặt `deviceLimit = 1` và cập nhật trạng thái `EXPIRED`.
- Nếu `daysOverdue = 0`: Giữ nguyên thông tin thuê bao đang hoạt động.

## 2. Bảng Test Cases

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế | Kết quả đúng mong đợi |
|---|---|---|---|
| TC01 - Nợ cước đúng 3 ngày | `daysOverdue = 3`, `planTier = FAMILY`, `deviceLimit = 5`, `status = ACTIVE` | Bị hạ cấp về `FREE`, `deviceLimit = 1`, `status = EXPIRED` | Giữ `FAMILY`, `deviceLimit = 5`, cập nhật `status = GRACE_PERIOD` |
| TC02 - Nợ cước 4 ngày | `daysOverdue = 4`, `planTier = FAMILY`, `deviceLimit = 5`, `status = ACTIVE` | Bị hạ cấp về `FREE`, `deviceLimit = 1`, `status = EXPIRED` | Hạ cấp về `FREE`, `deviceLimit = 1`, `status = EXPIRED` |

## 3. Kết luận

Lỗi phát sinh do sử dụng sai toán tử so sánh tại điều kiện kiểm tra số ngày nợ cước. Thay `>= 3` bằng `> 3` giúp hệ thống tuân thủ đúng thời gian ân hạn, tránh hạ cấp thuê bao sớm và cập nhật đồng bộ các thuộc tính của đối tượng trong mảng thuê bao.