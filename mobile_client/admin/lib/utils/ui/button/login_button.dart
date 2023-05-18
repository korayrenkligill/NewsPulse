import 'package:flutter/material.dart';

class LoginButton extends StatelessWidget {
  final void Function()? onPressed;
  final String text;
  const LoginButton({
    super.key,
    required this.text,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style:
            ElevatedButton.styleFrom(shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.zero))),
        child: Text(text),
      ),
    );
  }
}
