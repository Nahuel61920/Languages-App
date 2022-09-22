<?php

include 'db/db.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from lenguages where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from lenguages";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $name=$_POST['name'];
    $launch=$_POST['launch'];
    $developer=$_POST['developer'];
    $img=$_POST['img'];
    $query="insert into lenguages(name, launch, developer, img) values ('$name', '$launch', '$developer', '$img')";
    $queryAutoIncrement="select MAX(id) as id from lenguages";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $name=$_POST['name'];
    $launch=$_POST['launch'];
    $developer=$_POST['developer'];
    $img=$_POST['img'];
    $query="UPDATE lenguages SET name='$name', launch='$launch', developer='$developer', img='$img' WHERE id=$id";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM lenguages WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>