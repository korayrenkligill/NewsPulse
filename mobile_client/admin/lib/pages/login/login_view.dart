import 'package:admin/pages/login/login_view_model.dart';
import 'package:admin/utils/ui/button/login_button.dart';
import 'package:admin/utils/ui/input/c_input_field.dart';
import 'package:flutter/material.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends LoginViewModel {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Card(
              margin: const EdgeInsets.symmetric(horizontal: 40),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: Column(
                  children: [
                    Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 40),
                        child: CustomInputField(
                            icon: Icons.person_outlined,
                            hint: 'Name',
                            onChanged: (value) => setState(() {}),
                            controller: nameInputController,
                            textInputAction: TextInputAction.next)),
                    const SizedBox(height: 20),
                    Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 40),
                        child: CustomInputField(
                            icon: Icons.lock_outlined,
                            hint: 'Password',
                            onChanged: (value) => setState(() {}),
                            controller: passwordInputController,
                            obscureText: true,
                            onEditingComplete: isBtnEnable() ? () => adminLogin() : null,
                            textInputAction: TextInputAction.done)),
                    const SizedBox(height: 20),
                    LoginButton(text: 'LOGIN', onPressed: isBtnEnable() ? () => adminLogin() : null),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
