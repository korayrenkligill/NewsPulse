import 'package:admin/pages/login/login_view.dart';
import 'package:flutter/material.dart';

abstract class LoginViewModel extends State<LoginView> {
  final TextEditingController nameInputController = TextEditingController();
  final TextEditingController passwordInputController = TextEditingController();

  bool isBtnEnable() {
    if (nameInputController.text.isNotEmpty && passwordInputController.text.isNotEmpty) return true;

    return false;
  }

  void adminLogin() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('name: ${nameInputController.text}'),
              Text('password: ${passwordInputController.text}'),
            ],
          ),
        );
      },
    );
  }
}
