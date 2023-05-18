import 'package:flutter/material.dart';

class CustomInputField extends StatelessWidget {
  final TextEditingController? controller;
  final TextInputAction? textInputAction;
  final void Function()? onEditingComplete;
  final void Function(String) onChanged;
  final bool? obscureText;
  final IconData icon;
  final String hint;
  const CustomInputField({
    super.key,
    required this.onChanged,
    required this.icon,
    required this.hint,
    this.controller,
    this.textInputAction,
    this.onEditingComplete,
    this.obscureText,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: Colors.blue),
        const SizedBox(width: 10),
        Expanded(
          child: TextFormField(
            onChanged: onChanged,
            controller: controller,
            textInputAction: textInputAction,
            decoration: InputDecoration(hintText: hint),
            onEditingComplete: onEditingComplete,
            obscureText: obscureText ?? false,
          ),
        ),
      ],
    );
  }
}
