const AlertLogout = ({onClose}) => {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    
    return (
        <>
            <div style={{position:'fixed', top:'0', right:'0',bottom:'0', left:'0', display:'flex', justifyContent:'center',paddingTop:'200px'}}>
                <div style={{backgroundColor:'white', height:'max-content',padding:'10px',borderRadius:'20px', boxShadow:'0 0 10px white'}}>
                    <h3>Bạn có chắc muốn đăng xuất !</h3>
                    <p>Thông tin của bạn sẽ không còn được lưu và bạn sẽ phải đăng nhập vào lần tới ...</p>
                    <div style={{textAlign:'right'}}>
                        <button style={{border:'none',padding:'5px 10px', color:'white',backgroundColor:'var(--main-color)' ,borderRadius:'5px', margin:'0 10px'}}onClick={logout}>Đăng xuất</button>
                        <button style={{border:'none',padding:'5px 10px', color:'white',backgroundColor:'green' ,borderRadius:'5px', margin:'0 10px'}} onClick={onClose}>Hủy</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AlertLogout;