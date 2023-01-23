$(window).on("load", function getStudentData(){
    let  getStudenUrl = "http://localhost:8085/api/getStudents";
    $.get(getStudenUrl, function(data, status){
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        data.forEach(element => {
            let row=`<tr>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.registration}</td>
            <td>${element.email}</td>
            <td>
                <button class = "btn btn-success" id = "updateStd" student=${JSON.stringify(element)}> Update </button> 
                <button class = "btn btn-danger" id = "deleteStd" studentId=${element.id}> Delete </button>
            </td>
            </tr>`
            $("#studentTable").append(row);
        });
      });
    //   $("#getStudentDataBtn").prop("disabled",true);

});
$(document).on("click", "#updateStd", function(ev){
    var obj = $(ev.currentTarget).attr("student");
    obj = JSON.parse(obj);
    console.log(obj.id);
    $('.center').show();
    // Set Input fields
    $('#id').val(obj.id);
    $('#firstName').val(obj.firstName);
    $('#lastName').val(obj.lastName);
    $('#registrationNo').val(obj.registration);
    $('#email').val(obj.email);
    $('#saveChanges').val('Save Changes')
    $('form').attr('method','PUT')
    $('form').attr('action',"http://localhost:8085/api/updateStudent/"+obj.id)
});

$('#close').on('click', function () {
    $('.center').hide();
})



$(document).on("click", "#deleteStd", function(ev){
    var id = $(ev.currentTarget).attr("studentId");
    $.ajax({
        url: 'http://localhost:8085/api/deleteStudent/'+ id,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
            window.location.reload();
            alert(result);
        }
    });
});

$(document).on("click", "#addStudent", function(){
    $('.center').show();
    // Set Input fields
    $('#firstName').val("");
    $('#lastName').val("");
    $('#registrationNo').val("");
    $('#email').val("");
    $('#saveChanges').val('Add Student')
});

$(document).on("click", "#saveChanges", function(ev){
    var id = $('#id').val();
    var data = {
        firstName:$('#firstName').val(),
        lastName:$('#lastName').val(),
        registration:$('#registrationNo').val(),
        email:$('#email').val()
    };
    if($(ev.currentTarget).val()==="Add Student"){
        $.ajax({
            contentType: 'application/json',
            data:JSON.stringify(data),
            dataType: 'json',
            success: function(data){
                console.log(data);
                window.location.reload();
            },
            error: function(){
                alert("failed to save user");
            },
            processData: false,
            type: 'POST',
            url: "http://localhost:8085/api/addStudent"
        });
    }
    else{
        $.ajax({
            contentType: 'application/json',
            data:JSON.stringify(data),
            dataType: 'json',
            success: function(data){
                console.log(data);
                window.location.reload();
            },
            error: function(){
                alert("failed to update user");
            },
            processData: false,
            type: 'PUT',
            url: "http://localhost:8085/api/updateStudent/"+id
        });
    }
});
  